pragma solidity >=0.4.22 < 0.6.0;

import "./Ownable.sol";

contract Ads is Ownable {

    enum Position {Header, Footer, LeftSide, RightSide}

    string name;
    string htmlHash;
    Position position;
    uint64 startTime;
    uint duration;
    uint deadTime;


    constructor(string _name, string _htmlHash, uint _pos, uint _duration) public
    {
        name = _name;
        htmlHash = _htmlHash;
        position = Position(_pos);
        startTime = uint64(now);
        duration = _duration;
        deadTime = calculateDeadTime(_duration, startTime);

    }

    function setHtmlHash(string _htmlHash) public onlyOwner {
        htmlHash = _htmlHash;
    }

    function getHtmlHash() public view returns (string){
        return htmlHash;
    }

    function setName(string _name) public onlyOwner {
        name = _name;
    }

    function getName() public view returns (string){
        return name;
    }

    function getPosition() public view returns (uint){
        return uint(position);
    }

    function kill(bool flag) public onlyOwner {
        require(flag);
        selfdestruct(owner);
    }

    function getAds() public view returns (string, string, uint, uint){
        return (name, htmlHash, uint(position), duration);
    }

    function getDuration() public view returns (uint){
        return duration;
    }

    function getDeadTime() public view returns (uint){
        return deadTime;

    }

    function calculateDeadTime(uint _duration, uint64 _startTime) internal returns (uint)
    {
        deadTime = _duration + _startTime;
        return deadTime;
    }
}
