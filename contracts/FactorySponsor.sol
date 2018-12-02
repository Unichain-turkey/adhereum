pragma solidity >=0.4.22 <0.6.0;


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
        uint    status;//0->pending,1->confirm,2->deny and money back
        address owner;
    }

    Pending[] public pendingList;

//    ["Finartz","www.finartz.com","QmV8aySCTTvkpHPS4RjBpMnPhuTbt6EdmMhrBVPFPRAZSb",1,true],
//    ["Apple","www.apple.com","QmdLPh8Wk9aCHQTgPotkPG9Gbbc6Z7hUdrcdKUcfZ7nFTu*",2,true],
//    ["Inoix","www.inoix.com","QmZQAZd9M7W7vj7HdzAifLBNZTnapZbD32LmcqM1Fj1h2h",3,true],
//    ["Instagram","www.google.com","QmdLS83tKTBsAQQ3wGSqRUfrY3eKZcr5WWinDAJMv1GfNv",3,false],
//    ["ConsenSys","https://new.consensys.net","QmaQUfuFuF4uGtoj4o6LdvPJu9DJE99bra7zk3eCYyDhEt",2,true],
//    ["BKM","https://bkm.com.tr/","QmcoMVbowwHkwyQtySyVbL5vknU7UZ6ojP1vszZdfoNgmh",2,true],


    event beenSponsor(address _sponsor , string _name);
    event pendedList(string _name, string _url,string _hash,uint _duration);

    event denySponsor(address _address,string _name);

    event removedSponsor(address indexed sponsor, string name,uint month);
    event expiredSponsor(address indexed sponsor, string name,uint month);

    modifier Active(){
        require(isActive);
        _;
    }
    constructor(uint _sponsorLimit,uint _price) public{
        sponsorLimit=_sponsorLimit;
        price=_price;
        isActive=true;

    }
    //expire need
    function beSponsor(string _name,string _url,string _imageHash,uint _duration)
    payable
    Active
    public{
        require(msg.value >= price * (1 finney) * _duration );
        require(sponsorCount < sponsorLimit);

        require(addressToSponsor[msg.sender]==address(0));//ayni hesapdan kayit yasak

        pendingList.push(Pending({name:_name,url:_url,imageHash:_imageHash,duration:_duration,status:0,owner:msg.sender}));

        emit pendedList(_name,_url,_imageHash,_duration);

    }


    //admin methods
    function removeSponsor(uint _index)
    onlyOwner
    public
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

        Pending storage  tmp=pendingList[_index];
        require(tmp.status==0);  //if
        Sponsor _sponsor=new Sponsor(tmp.name,tmp.url,tmp.imageHash,tmp.duration);
        Sponsors.push(address(_sponsor));
        addressToSponsor[tmp.owner]=address(_sponsor);
        sponsorCount+=1;
        tmp.status=1;
        emit beenSponsor(address(_sponsor),tmp.name);

    }
    function deny(uint _index)
    onlyOwner
    public{
        Pending storage  tmp=pendingList[_index];
        require(tmp.status==0);
        tmp.status=2;
        tmp.owner.transfer(price * (1 finney) * tmp.duration);
        emit denySponsor(tmp.owner,tmp.name);

    }
    function isAdmin() public view returns(bool){
        return (msg.sender==owner);
    }

    function getAdmin() public view returns(address){
        return owner;
    }

    function setLimit(uint _limit)
    onlyOwner
    public{
        require(_limit>=sponsorCount);
        sponsorLimit=_limit;
    }

    function getLimit() public view returns(uint){
        return sponsorLimit;
    }

    function setActive(bool _isActive)
    onlyOwner()
    public{
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

    function expireDetect()
    internal
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
