pragma solidity ^0.4.17;

import "./Ownable.sol";

contract Sponsor is Ownable{
    
    
    string name;
    string url;
    bytes32 imageHash;
    uint64 startTime;
    uint numberofMonth;

    function Sponsor(string _name,string _url,bytes32 _imageHash,uint _numberofMonth) public {
     name=_name;
     url=_url;
     imageHash=_imageHash;
     startTime=uint64(now);
     numberofMonth=_numberofMonth;
    }
    
    function setUrl(string _url)public onlyOwner{
        url=_url;
    }
    function setHash(bytes32 _imageHash)public onlyOwner{
        imageHash=_imageHash;
    }
    function setName(string _name)public onlyOwner{
        name=_name;
    }
    function kill(bool flag) public onlyOwner{
        require(flag);
        selfdestruct(owner);
    }
    function getSponsor() public view returns(string ,string ,bytes32 ){
        return (name, url,imageHash);
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