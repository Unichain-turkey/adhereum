pragma solidity >=0.4.22 < 0.6.0;

import "./Ads.sol";
import "./Ownable.sol";

contract AdsFactory is Ownable {


    enum Position {Header, Footer, LeftSide, RightSide}

    bool isActive;
    uint adsLimit;
    uint adsCount;
    uint price;

    address[] public listOfAds;//
    mapping(address => address) public addressToAds;

    struct Pending {
        string name;
        string htmlHash;
        Position position;
        uint duration;
        uint status;//0->pending,1->confirm,2->deny and money back
        address owner;
    }

    Pending[] public pendingList;

    event createdAds(address _ads, string _name);
    event requestAds(string _name, string _htmlHash, uint _position, uint _duration);
    event deniedAds(address _address, string _name);
    event removedAds(address indexed ads, string name, uint month);
    event expiredAds(address indexed ads, string name, uint month);

    modifier Active(){
        require(isActive);
        _;
    }
    constructor(uint _adsLimit, uint _price) public{
        adsLimit = _adsLimit;
        price = _price;
        isActive = true;
    }

    //expire indexed
    function requestAdvertisement(string _name, string _htmlHash, uint _pos, uint _duration)
    payable
    Active
    public {
        require(msg.value >= price);
        require(adsCount < adsLimit);

        //forbitten request from same address
        require(addressToAds[msg.sender] == address(0));

        pendingList.push(Pending({name : _name, htmlHash : _htmlHash, duration : _duration, position : Position(_pos), status : 0, owner : msg.sender}));

        emit requestAds(_name, _htmlHash, _pos, _duration);

    }

    //admin methods
    function removeAds(uint _index)
    onlyOwner
    public
    {
        Ads _temp = Ads(listOfAds[_index]);
        delete addressToAds[_temp.getOwner()];
        delete listOfAds[_index];
        adsCount -= 1;
        emit removedAds(address(_temp), _temp.getName(), _temp.getDuration());
    }

    function confirm(uint _index)
    onlyOwner
    public {

        Pending storage tmp = pendingList[_index];
        require(tmp.status == 0);

        Ads _ads = new Ads(tmp.name, tmp.htmlHash, uint(tmp.position), tmp.duration);
        listOfAds.push(address(_ads));
        addressToAds[tmp.owner] = address(_ads);
        adsCount += 1;
        tmp.status = 1;
        emit createdAds(address(_ads), tmp.name);

    }

    function deny(uint _index)
    onlyOwner
    public {
        Pending storage tmp = pendingList[_index];
        require(tmp.status == 0);
        tmp.status = 2;
        tmp.owner.transfer(price);
        emit deniedAds(tmp.owner, tmp.name);

    }

    function isAdmin() public view returns (bool){
        return (msg.sender == owner);
    }

    function getAdmin() public view returns (address){
        return owner;
    }

    function setLimit(uint _limit)
    onlyOwner
    public {
        require(_limit >= adsCount);
        adsLimit = _limit;
    }

    function getLimit() public view returns (uint){
        return adsLimit;
    }

    function setActive(bool _isActive)
    onlyOwner()
    public {
        isActive = _isActive;
    }

    function getActive() public view returns (bool){
        return isActive;
    }

    function setPrice(uint _price) public onlyOwner() {
        price = _price;
    }

    function getPrice() public view returns (uint){
        return price;
    }

    function getAds(uint _index) public view returns (address){
        return listOfAds[_index];
    }

    function getAdsCount() public view returns (uint){
        return adsCount;
    }

    function getPendingAds(uint _ind) public view returns (string, string, uint, uint, uint){
        return (pendingList[_ind].name, pendingList[_ind].htmlHash, uint(pendingList[_ind].position), pendingList[_ind].duration, pendingList[_ind].status);
    }

    function getPendingsCount() public view returns (uint){
        return pendingList.length;
    }

    function expireDetect()
    internal
    {
        uint i = 0;
        for (i; i < adsCount; i++) {
            Ads _temp = Ads(listOfAds[i]);
            require(uint64(now) >= _temp.getDeadTime());
            delete addressToAds[_temp.getOwner()];
            delete listOfAds[i];
            adsCount -= 1;
        }
    }

}
