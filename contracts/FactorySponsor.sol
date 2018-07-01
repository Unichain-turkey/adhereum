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
        string name;
        string url;
        string imageHash;
        uint duration;
        uint    status;
        address owner;
    }

    Pending[] public pendingList;//




    event beenSponsor(address , string );
    event pendedList(string , string,string ,uint );

    event confirmSponsor(address , address);
    event denySponsor(address,string);

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

        require(addressToSponsor[msg.sender]==address(0));//ayni hesapdan kayit yasak

        pendingList.push(Pending({name:_name,url:_url,imageHash:_imageHash,duration:_duration,status:0,owner:msg.sender}));

        emit pendedList(_name,_url,_imageHash,_duration);

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
    // todo later add onlyowner
    function confirm(uint _index)
    public{

        Pending storage  tmp=pendingList[_index];
        require(tmp.status==0);  //if
        Sponsor _sponsor=new Sponsor(tmp.name,tmp.url,tmp.imageHash,tmp.duration);
        Sponsors.push(address(_sponsor));
        addressToSponsor[tmp.owner]=address(_sponsor);
        sponsorCount+=1;
        tmp.status=1;
        emit beenSponsor(address(_sponsor),tmp.name);

    }
    // todo later add onlyowner
    function deny(uint _index)
    public{
        Pending storage  tmp=pendingList[_index];
        require(tmp.status==0);  //if

        //transfer money to back
        tmp.status=2;
        emit denySponsor(tmp.owner,tmp.name);

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
    function getPendingList(uint _ind) public view returns(string,string,string,uint,uint){
        return (pendingList[_ind].name, pendingList[_ind].url,pendingList[_ind].imageHash,pendingList[_ind].duration,pendingList[_ind].status);
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