pragma solidity ^0.4.4;

import "./Sponsor.sol";
import "./Ownable.sol";
//expire
//pending 
contract FactorySponsor is Ownable{

    
    bool isactive;
    uint limitSponsor;
    uint countSponsor;
    uint price;
    
    
    address[] public Sponsors;//
    mapping (address => address) public addresstoSponsor;
    
    event beenSponsor(address indexed sponsor, string name,uint month);
    event removedSponsor(address indexed sponsor, string name,uint month);
    event expiredSponsor(address indexed sponsor, string name,uint month);
    
    modifier isActive(){
        require(isactive);
        _;
    }

    function FactorySponsor(uint _limitSponsor,uint _price)public{
        limitSponsor=_limitSponsor;
        price=_price;
        
    }
    //expire need
    function beSponsor(string _name,string _url,bytes32 _imageHash,uint _numberofMonth) 
    payable
    isActive
    public{
        
        require(msg.value == price* 10**15);
        require(countSponsor< limitSponsor);
        require(addresstoSponsor[msg.sender]==address(0));
        
        Sponsor _sponsor=new Sponsor(_name,_url,_imageHash,_numberofMonth);
        Sponsors.push(address(_sponsor));
        addresstoSponsor[msg.sender]=address(_sponsor);
        countSponsor+=1;
        beenSponsor(address(_sponsor),_name,_numberofMonth); 
        
    }
    
    //admin methods
    function removeSponsor(uint _index) public onlyOwner 
    {
        Sponsor _temp=Sponsor(Sponsors[_index]);
        delete addresstoSponsor[_temp.getOwner()];
        delete Sponsors[_index];
        countSponsor-=1;
        
    }
    
    function setLimit(uint _limit) public onlyOwner{
        require(_limit>=countSponsor);
        limitSponsor=_limit;
    }
    function setActive(bool _isactive) public onlyOwner(){
        isactive=_isactive;
    }
    function setPrice(uint _price) public onlyOwner(){
        price=_price;
    }
    function getSponsor(uint _index) public view returns(address){
       return Sponsors[_index];
    }
    function getNumberofSponsor() public view returns(uint){
       return countSponsor;
    }
    
}