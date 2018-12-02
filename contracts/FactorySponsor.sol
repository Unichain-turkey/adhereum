pragma solidity >=0.4.22 < 0.6.0;

import "./Sponsor.sol";
import "./Ownable.sol";

contract FactorySponsor is Ownable {




    bool isActive;
    uint sponsorLimit;
    uint sponsorCount;

    uint priceGold;
    uint priceSilver;
    uint priceBronze;

    address[] public listOfSponsors;//
    mapping(address => address) public addressToSponsor;

    struct Pending {
        string name;
        string url;
        string imageHash;
        string position;
        uint duration;
        uint status;//0->pending,1->confirm,2->deny and money back
        address owner;
    }

    Pending[] public pendingList;

    event beenSponsor(address _sponsor, string _name);
    event requestSponsor(string _name, string _url, string _hash, uint _duration);
    event deniedSponsor(address _address, string _name);
    event removedSponsor(address indexed sponsor, string name, uint month);
    event expiredSponsor(address indexed sponsor, string name, uint month);

    modifier Active(){
        require(isActive);
        _;
    }
    constructor(uint _sponsorLimit, uint _priceGold, uint _priceSilver, uint _priceBronze) public{
        sponsorLimit = _sponsorLimit;
        priceGold = _priceGold;
        priceSilver = _priceSilver;
        priceBronze = _priceBronze;
        isActive = true;

    }
    function
    //expire need
    function requestBeingSponsor(string _name, string _url, string _imageHash, uint _duration)
    payable
    Active
    public {
        require(msg.value >= price * (1 finney) * _duration);
        require(sponsorCount < sponsorLimit);

        require(addressToSponsor[msg.sender] == address(0));
        //ayni hesapdan kayit yasak

        pendingList.push(Pending({name : _name, url : _url, imageHash : _imageHash, duration : _duration, status : 0, owner : msg.sender}));

        emit pendedList(_name, _url, _imageHash, _duration);

    }

    //admin methods
    function removeSponsor(uint _index)
    onlyOwner
    public
    {
        Sponsor _temp = Sponsor(Sponsors[_index]);
        delete addressToSponsor[_temp.getOwner()];
        delete Sponsors[_index];
        sponsorCount -= 1;
        emit removedSponsor(address(_temp), _temp.getName(), _temp.getDuration());
    }

    function confirm(uint _index)
    onlyOwner
    public {

        Pending storage tmp = pendingList[_index];
        require(tmp.status == 0);
        //if
        Sponsor _sponsor = new Sponsor(tmp.name, tmp.url, tmp.imageHash, tmp.duration);
        Sponsors.push(address(_sponsor));
        addressToSponsor[tmp.owner] = address(_sponsor);
        sponsorCount += 1;
        tmp.status = 1;
        emit beenSponsor(address(_sponsor), tmp.name);

    }

    function deny(uint _index)
    onlyOwner
    public {
        Pending storage tmp = pendingList[_index];
        require(tmp.status == 0);
        tmp.status = 2;
        tmp.owner.transfer(price * (1 finney) * tmp.duration);
        emit denySponsor(tmp.owner, tmp.name);

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
        require(_limit >= sponsorCount);
        sponsorLimit = _limit;
    }

    function getLimit() public view returns (uint){
        return sponsorLimit;
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

    function getSponsor(uint _index) public view returns (address){
        return Sponsors[_index];
    }

    function getSponsorCount() public view returns (uint){
        return sponsorCount;
    }

    function getPendingList(uint _ind) public view returns (string, string, string, uint, uint){
        return (pendingList[_ind].name, pendingList[_ind].url, pendingList[_ind].imageHash, pendingList[_ind].duration, pendingList[_ind].status);
    }

    function getNumberPending() public view returns (uint){
        return pendingList.length;
    }

    function expireDetect()
    internal
    {
        uint i = 0;
        for (i; i < sponsorCount; i++) {
            Sponsor _temp = Sponsor(Sponsors[i]);
            require(uint64(now) >= _temp.getDeadTime());
            delete addressToSponsor[_temp.getOwner()];
            delete Sponsors[i];
            sponsorCount -= 1;
        }
    }

}
