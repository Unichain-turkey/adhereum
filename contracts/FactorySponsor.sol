pragma solidity ^0.4.17;

import "./Sponsor.sol";
import "./Ownable.sol";
//expire
//pending
contract FactorySponsor is Ownable{


    bool isActive;
    uint sponsorLimit;
    uint sponsorCount;
    uint price;


    address[] public Sponsors;//
    mapping (address => address) public addressToSponsor;

    event beenSponsor(address indexed sponsor, string name, uint month, uint timestamp);
    event removedSponsor(address indexed sponsor, string name,uint month, uint timestamp);
    event expiredSponsor(address indexed sponsor, string name,uint month, uint timestamp);

    modifier Active(){
        require(isActive);
        _;
    }

    constructor(uint _sponsorLimit,uint _price)public{
        sponsorLimit=_sponsorLimit;
        price=_price;

    }
    //expire need
    function beSponsor(string _name,string _url,bytes32 _imageHash,uint _duration)
    payable
    Active
    public{
        require(msg.value >= price * (1 finney) );
        require(sponsorCount < sponsorLimit);
        // require(addressToSponsor[msg.sender]==address(0));

        Sponsor _sponsor=new Sponsor(_name,_url,_imageHash,_duration);
        Sponsors.push(address(_sponsor));
        addressToSponsor[msg.sender]=address(_sponsor);
        sponsorCount+=1;
        emit beenSponsor(address(_sponsor),_name,_duration, now);

    }

    //admin methods
    function removeSponsor(uint _index) public onlyOwner
    {
        Sponsor _temp=Sponsor(Sponsors[_index]);
        delete addressToSponsor[_temp.getOwner()];
        delete Sponsors[_index];
        sponsorCount-=1;
        emit removedSponsor(address(_temp), _temp.getName(), _temp.getDuration(), now);
    }

    function setLimit(uint _limit) public onlyOwner{
        require(_limit>=sponsorCount);
        sponsorLimit=_limit;
    }
    function getLimit() public view returns(uint){
        return sponsorLimit;
    }
    function setActive(bool _isActive) public onlyOwner(){
        isActive=_isActive;
    }
    function getActive() public view returns(bool){
        return isActive;
    }
    function setPrice(uint _price) public onlyOwner(){
        price=_price;
    }
    function getPrice() public view returns(uint){
        return price;
    }
    function getSponsor(uint _index) public view returns(address){
        return Sponsors[_index];
    }
    function getSponsorCount() public view returns(uint){
        return sponsorCount;
    }
}