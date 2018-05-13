pragma solidity ^0.4.23;

import "./Ownable.sol";

contract Sponsor is Ownable{
    
    
    string name;
    string url;
    bytes32 imageHash;
    uint64 startTime;
    uint numberofMonth;
    
    function Sponsor(string _name,string _url,bytes32 _imageHash,uint _numberofMonth){
     name=_name;
     url=_url;
     imageHash=_imageHash;
     startTime=uint64(now);
     numberofMonth=_numberofMonth;
    }
    
    function getName()public view returns (string){
        return name;
    }
    
     function getUrl()public view returns (string){
        return url;
    }

     function getHash()public view returns (bytes32){
        return imageHash;
    }
    
    
    
    
    
}