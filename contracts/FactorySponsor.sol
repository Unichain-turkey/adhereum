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



    struct Pending{
        address _owner;
        address _contract;
        int    _status;
    }

    Pending[] public pendingList;//




    event beenSponsor(address indexed sponsor, string name, uint month);
    event pendinglist(address indexed sponsor, string name, uint month);
    event confirmSponsor(address , address);
    event denySponsor(address,address);
    event removedSponsor(address indexed sponsor, string name,uint month);
    event expiredSponsor(address indexed sponsor, string name,uint month);

    modifier Active(){
        require(isActive);
        _;
    }

    constructor(uint _sponsorLimit,uint _price)public{
        sponsorLimit=_sponsorLimit;
        price=_price;
        isActive=true;

    }
    //expire need
    function beSponsor(string _name,string _url,string _imageHash,uint _duration)
    payable
    Active
    public{
        require(msg.value >= price * (1 finney) );
        require(sponsorCount < sponsorLimit);
        //require(addressToSponsor[msg.sender]==address(0));

        Sponsor _sponsor=new Sponsor(_name,_url,_imageHash,_duration);


        pendingList.push(Pending({_owner:msg.sender, _contract:_sponsor,_status:0}));

        emit pendinglist(address(_sponsor),_name,_duration);

    }



    //admin methods
    function removeSponsor(uint _index) public onlyOwner
    {
        Sponsor _temp=Sponsor(Sponsors[_index]);
        delete addressToSponsor[_temp.getOwner()];
        delete Sponsors[_index];
        sponsorCount-=1;
        emit removedSponsor(address(_temp), _temp.getName(), _temp.getDuration());
    }

    function confirm(uint _index)
    onlyOwner
    public{

        Pending storage  _tmp=pendingList[_index];
        require(_tmp._status==0);  //if
        Sponsors.push(address(_tmp._contract));
        addressToSponsor[_tmp._owner]=address(_tmp._contract);
        sponsorCount+=1;
        _tmp._status=1;
        emit confirmSponsor(_tmp._owner,_tmp._contract);

    }

    function deny(uint _index)
    onlyOwner
    public{
        Pending storage  _tmp=pendingList[_index];
        require(_tmp._status==0);  //if

        //transfer money to back
        _tmp._status=2;
        emit denySponsor(_tmp._owner,_tmp._contract);

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
    function getPendingList(uint _index) public view returns(address,address){
        return (pendingList[_index]._owner, pendingList[_index]._contract);
    }
    function getNumberPending() public view returns(uint){
        return pendingList.length;
    }
    function expireDetect() public
    {
        uint i = 0;
        for(i;i<sponsorCount;i++){
        Sponsor _temp=Sponsor(Sponsors[i]);
        require(uint64(now) >= _temp.getDeadTime());
        delete addressToSponsor[_temp.getOwner()];
        delete Sponsors[i];
        sponsorCount-=1;
        }
    }


}