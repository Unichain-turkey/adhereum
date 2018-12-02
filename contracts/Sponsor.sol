pragma solidity >=0.4.22 < 0.6.0;

import "./Ownable.sol";

contract Sponsor is Ownable {

    enum Role {Gold, Bronze, Silver}

    string name;
    string url;
    string imageHash;
    Role role;
    uint64 startTime;
    uint duration;
    uint deadTime;


    constructor(string _name, string _url, string _imageHash, uint _type, uint _duration) public
    {
        name = _name;
        url = _url;
        imageHash = _imageHash;
        startTime = uint64(now);
        role = Role(_type);
        duration = _duration;
        deadTime = calculateDeadTime(_duration, startTime);

    }

    function setUrl(string _url) public onlyOwner {
        url = _url;
    }

    function getUrl() public view returns (string){
        return url;
    }

    function setHash(string _imageHash) public onlyOwner {
        imageHash = _imageHash;
    }

    function getHash() public view returns (string){
        return imageHash;
    }

    function setName(string _name) public onlyOwner {
        name = _name;
    }

    function getName() public view returns (string){
        return name;
    }

    function getRole() public view returns (uint){
        return uint(role);
    }

    function kill(bool flag) public onlyOwner {
        require(flag);
        selfdestruct(owner);
    }

    function getSponsor() public view returns (string, string, string,uint, uint){
        return (name, url, imageHash,uint(role), duration);
    }

    function getDuration() public view returns (uint){
        return duration;
    }

    function getDeadTime() public view returns (uint){
        return deadTime;
    }

    function calculateDeadTime(uint _duration, uint64 _startTime) public returns (uint)
    {
        deadTime = _duration + _startTime;
        return deadTime;
    }
}
