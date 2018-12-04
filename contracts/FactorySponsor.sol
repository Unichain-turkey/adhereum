pragma solidity >=0.4.22 < 0.6.0;

import "./Sponsor.sol";
import "./Ownable.sol";

contract FactorySponsor is Ownable {
    
    enum Role {Gold, Bronze, Silver}
    
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
        Role role;
        uint duration;
        uint status;//0->pending,1->confirm,2->deny and money back
        address owner;
    }

    Pending[] public pendingList;

    event beenSponsor(address _sponsor, string _name);
    event requestSponsor(string _name, string _url, string _hash, uint _type, uint _duration);
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
    
    function calculatePrice( uint _type,uint _duration)  view internal returns(uint){
        if(Role(_type)==Role.Bronze) {
          return  priceGold * (1 finney) * _duration;
        } else if(Role(_type)==Role.Silver) {
          return  priceGold * (1 finney) * _duration;
        }
        else{
            return  priceSilver * (1 finney) * _duration;
        }
    }
    //expire indexed
    function requestBeingSponsor(string _name, string _url, string _imageHash, uint _type, uint _duration)
    payable
    Active
    public {
        require(msg.value >= calculatePrice(_type,_duration));
        require(sponsorCount < sponsorLimit);
        
        //forbitten request from same address
        require(addressToSponsor[msg.sender] == address(0));
    
        pendingList.push(Pending({name : _name, url : _url, imageHash : _imageHash, duration : _duration,role:Role(_type), status : 0, owner : msg.sender}));
        
        emit requestSponsor(_name, _url, _imageHash,_type, _duration);

    }

    //admin methods
    function removeSponsor(uint _index)
    onlyOwner
    public
    {
        Sponsor _temp = Sponsor(listOfSponsors[_index]);
        delete addressToSponsor[_temp.getOwner()];
        delete listOfSponsors[_index];
        sponsorCount -= 1;
        emit removedSponsor(address(_temp), _temp.getName(), _temp.getDuration());
    }

    function confirm(uint _index)
    onlyOwner
    public {

        Pending storage tmp = pendingList[_index];
        require(tmp.status == 0);

        Sponsor _sponsor = new Sponsor(tmp.name, tmp.url, tmp.imageHash,uint(tmp.role),tmp.duration);
        listOfSponsors.push(address(_sponsor));
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
        tmp.owner.transfer(calculatePrice(uint(tmp.role),tmp.duration));
        emit deniedSponsor(tmp.owner, tmp.name);

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

    function setPrice(uint _price,uint _type) public onlyOwner() {
        if(Role(_type)==Role.Bronze) {
            priceBronze=_price;
        } else if(Role(_type)==Role.Silver) {
           priceSilver=_price;
        }
        else{
            priceGold=_price;
        }
    }

    function getPrice() public view returns (uint,uint,uint){
        return (priceGold,priceSilver,priceBronze);
    }

    function getSponsor(uint _index) public view returns (address){
        return listOfSponsors[_index];
    }

    function getSponsorsCount() public view returns (uint){
        return sponsorCount;
    }

    function getPendingSponsor(uint _ind) public view returns (string, string, string, uint,uint, uint){
        return (pendingList[_ind].name, pendingList[_ind].url, pendingList[_ind].imageHash, uint(pendingList[_ind].role), pendingList[_ind].duration, pendingList[_ind].status);
    }

    function getPendingsCount() public view returns (uint){
        return pendingList.length;
    }

    function expireDetect()
    internal
    {
        uint i = 0;
        for (i; i < sponsorCount; i++) {
            Sponsor _temp = Sponsor(listOfSponsors[i]);
            require(uint64(now) >= _temp.getDeadTime());
            delete addressToSponsor[_temp.getOwner()];
            delete listOfSponsors[i];
            sponsorCount -= 1;
        }
    }

}
