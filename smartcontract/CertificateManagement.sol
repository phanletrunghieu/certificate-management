// Name: CertificateManagement
//--------------------------------------------------------------------------------------
pragma solidity ^0.4.25;

import "github.com/Arachnid/solidity-stringutils/strings.sol";

contract CertificateManagement{
    
    using strings for *;
    
    uint CertificateID = 0;
    address ownerOfSmartContract;
    
    struct SuperUser{
        address createBy;
        string nameOfUser;
        string position;
        bool uploadPermission;
    }
    
    struct CheckSharer{
        int check;
    }
    
    struct User{
        uint[] userCertificates; // list of certificate
        mapping (uint => mapping ( address => uint)) shareCertificate; // check sharer
    }
    
    struct Certificate{
        uint id;
        address owner;
        string name;
        address createBy;
        string certificateIPFS;
        int checkPublic;
    }
    
    constructor() public payable{
        ownerOfSmartContract = msg.sender;
        superUserList[msg.sender].createBy = msg.sender;
        superUserList[msg.sender].nameOfUser = "_name";
        superUserList[msg.sender].position = "_position";
        superUserList[msg.sender].uploadPermission = true;
    }

    mapping (uint => Certificate) certificateList;
    mapping (address => SuperUser) superUserList;
    mapping (address => User) userList;
    mapping (address => uint[]) shareList;
    
    // check super user
    modifier superUserAuthority(){
        SuperUser memory authority = superUserList[msg.sender];
        require( authority.createBy != 0);
      _;
    }
    
    // check super user has permission
    modifier superUserAuthorityPermission(){
        SuperUser memory authority = superUserList[msg.sender];
        require( authority.createBy != 0 && authority.uploadPermission == true);
      _;
    }
    
    // owner Aauthority
    modifier ownerAuthority(uint _idOfCertificate){
        require(msg.sender == certificateList[_idOfCertificate].owner);
        _;
    }

    // ---------------- register super user -----------------------------------
    
    function register(address _address, string _name, string _position, bool _uploadPermission) public superUserAuthority{
        superUserList[_address].createBy = msg.sender;
        superUserList[_address].nameOfUser = _name;
        superUserList[_address].position = _position;
        superUserList[_address].uploadPermission = _uploadPermission;
        
    }
    
    // --------------- upload Certificate -------------------------------------
    
    function uploadCertificate(address _owner, string _name, string _certificateIPFS) public superUserAuthorityPermission{
        uint _id = CertificateID + 1;
        Certificate memory cert = Certificate(_id ,_owner, _name, msg.sender, _certificateIPFS, 0);
        certificateList[_id] = cert;
        userList[_owner].userCertificates.push(_id);
    }
    
    // -----------------get Super user information ----------------------------
    
    function getSuperUser(address _address) view public returns(address _createBy, string _nameOfUser, string _position, bool _uploadPermission){
            return (superUserList[_address].createBy, superUserList[_address].nameOfUser, superUserList[_address].position, superUserList[_address].uploadPermission);
    }
    
    
    // --------------------------- get Certificate -----------------------------
    function getUserCertificate(uint _idOfCertificate, address _CertificateOwnerAddress) public
    view returns(uint id, address owner, string name, address createBy, string certificateIPFS){
        if (_CertificateOwnerAddress == msg.sender || superUserList[_CertificateOwnerAddress].createBy == msg.sender || userList[_CertificateOwnerAddress].shareCertificate[_idOfCertificate][msg.sender] == 1){
            Certificate memory temp = certificateList[_idOfCertificate];
            return (temp.id, temp.owner, temp.name, temp.createBy, temp.certificateIPFS);
        }
        revert();
    }
    
    function userCerts(uint _idOfCertificate, address _CertificateOwnerAddress) public view returns(string numbers){
        if (_CertificateOwnerAddress == msg.sender || superUserList[_CertificateOwnerAddress].createBy == msg.sender || userList[_CertificateOwnerAddress].shareCertificate[_idOfCertificate][msg.sender] == 1){

            for (uint i = 0; i < userList[_CertificateOwnerAddress].userCertificates.length; i++){
                 string memory temp = uintToString(userList[_CertificateOwnerAddress].userCertificates[i]);
                 numbers = numbers.toSlice().concat(temp.toSlice());
            }
            return numbers;
            
        }
        revert();
    }
    
    function getSharedCertificate(uint _idOfCertificate) public ownerAuthority(_idOfCertificate) view returns(uint id, address owner, string name, address createBy, string certificateIPFS){
            Certificate memory temp = certificateList[_idOfCertificate];
            return (temp.id, temp.owner, temp.name, temp.createBy, temp.certificateIPFS);
        
    }
    
    function sharedCerts() public view returns(string numbers){
            for (uint i = 0; i < shareList[msg.sender].length; i++){
                 string memory temp = uintToString(shareList[msg.sender][i]);
                 numbers = numbers.toSlice().concat(temp.toSlice());
            }
            return numbers;
    }
    
    // ------------------------------- share ----------------------------------
    
    function shareCert(address _receiver, uint _idOfCertificate) public ownerAuthority(_idOfCertificate){
        userList[msg.sender].shareCertificate[_idOfCertificate][_receiver] = 1;
        shareList[_receiver].push(_idOfCertificate);
    }
    
    function unSshareCert(address _receiver, uint _idOfCertificate) public ownerAuthority(_idOfCertificate){
        userList[msg.sender].shareCertificate[_idOfCertificate][_receiver] = 0;
        for ( uint i = 0; i < shareList[_receiver].length; i++){
            if(shareList[_receiver][i] == _idOfCertificate){
                delete shareList[_receiver][i];
                break;
            }
        }
    }
    
    function checkPrivateOrPublic(int _check, uint _idOfCertificate) public ownerAuthority(_idOfCertificate){
        certificateList[_idOfCertificate].checkPublic = _check;
    }
    
    function uintToString(uint v) private constant returns (string str) {
        uint maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint i = 0;
        while (v != 0) {
            uint remainder = v % 10;
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory s = new bytes(i);
        for (uint j = 0; j < i; j++) {
            s[j] = reversed[i - j - 1];
        }
        str = string(s);
    }
    
    
}