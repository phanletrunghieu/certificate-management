// Name: CertificateManagement
//--------------------------------------------------------------------------------------
pragma solidity ^0.4.25;

import "github.com/Arachnid/solidity-stringutils/strings.sol";

contract CertificateManagement{
    
    uint CertificateID = 0;
    address ownerOfSmartContract;
    
    struct SuperUser{
        address createBy;
        string nameOfUser;
        string position;
        bool uploadPermission;
    }
    
    struct Certificate{
        uint id;
        address owner;
        string name;
        address createBy;
        string certificateIPFS;
        bool checkPublic;
    }
    
    constructor() public payable{
        ownerOfSmartContract = msg.sender;
        superUserList[msg.sender].createBy = msg.sender;
        superUserList[msg.sender].nameOfUser = "_name";
        superUserList[msg.sender].position = "_position";
        superUserList[msg.sender].uploadPermission = true;
    }

    
    mapping (address => SuperUser) superUserList;
    mapping (address => Certificate[]) userCertificates;
    mapping (uint => address[]) addressPermissionList;
    //mapping (uint => Certificate) certificateList;
    mapping (address => mapping (uint => Certificate)) sharedCertificatesList;
    
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
    
    // check address has Certificate permission
    modifier addressPermissionAuthority(uint _idOfCertificate){
        for (uint i = 0; i < addressPermissionList[_idOfCertificate].length; i++) {
            require(addressPermissionList[_idOfCertificate][i] == msg.sender);
        }
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
        Certificate memory cert = Certificate(_id ,_owner, _name, msg.sender, _certificateIPFS, false);
        userCertificates[_owner].push(cert);
    }
    
    // -----------------get Super user information ----------------------------
    
    function getSuperUser(address _address) view public returns(address _createBy, string _nameOfUser, string _position, bool _uploadPermission){
            return (superUserList[_address].createBy, superUserList[_address].nameOfUser, superUserList[_address].position, superUserList[_address].uploadPermission);
    }
    
    // function getNormalUser() view public returns(string _listCertificate){
    //     Certificate[] memory temp = userCertificates[msg.sender];
    //     for(uint i = 0; i < temp.length; i++){
    //         string storage certs = uintToString(temp[i].id);
    //         //+ "+" +temp[i].owner + "+" +temp[i].name + "+" +temp[i].createBy + "+" +temp[i].certificateIPFS;
    //         _listCertificate = _listCertificate.toSlice().concat(certs.toSlice());
    //     }
    // }
    
    
    // --------------------------- get Certificate -----------------------------
    function getCertificate(uint _idOfCertificate, address _CertificateOwnerAddress)
    public addressPermissionAuthority(_idOfCertificate)
    view returns(uint id, address owner, string name, address createBy, string certificateIPFS){
        Certificate[] memory temp = userCertificates[_CertificateOwnerAddress];
        for ( uint i = 0; i < temp.length; i++){
            if(temp[i].id == _idOfCertificate){
                return (temp[i].id, temp[i].owner, temp[i].name, temp[i].createBy, temp[i].certificateIPFS);
            }
        }
    }
    
    // ------------------------------- share ----------------------------------
    
    function shareCertificate(address _receiver, uint _idCertificate) public {
        //require(userCertificates[msg.sender][_idCertificate].id > 0);
        Certificate memory temp = userCertificates[msg.sender][_idCertificate];
        sharedCertificatesList[_receiver][_idCertificate] = temp;
    }
    
     function unShareCertificate(address _receiver, uint _idCertificate) public {
        require(userCertificates[msg.sender][_idCertificate].id > 0);
        delete sharedCertificatesList[_receiver][_idCertificate];
    }
    
    
    
}