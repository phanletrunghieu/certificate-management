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
    }
    
    constructor() public payable{
        ownerOfSmartContract = msg.sender;
        superUserList[msg.sender].createBy = msg.sender;
        superUserList[msg.sender].nameOfUser = "_name";
        superUserList[msg.sender].position = "_position";
        superUserList[msg.sender].uploadPermission = true;
    }

    
    mapping (address => SuperUser) superUserList;
    mapping (address => Certificate[]) certificateList;
    mapping (uint => address[]) addressPermissionList;
    
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

    
    function register(address _address, string _name, string _position, bool _uploadPermission) public superUserAuthority{
        superUserList[_address].createBy = msg.sender;
        superUserList[_address].nameOfUser = _name;
        superUserList[_address].position = _position;
        superUserList[_address].uploadPermission = _uploadPermission;
        
    }
    
    
    function uploadCertificate(address _owner, string _name, string _certificateIPFS) public superUserAuthorityPermission{
        uint _id = CertificateID + 1;
        Certificate memory cert = Certificate(_id ,_owner, _name, msg.sender, _certificateIPFS);
        certificateList[_owner].push(cert);
    }
    
    function getSuperUser(address _address) view public returns(address _createBy, string _nameOfUser, string _position, bool _uploadPermission){
            return (superUserList[_address].createBy, superUserList[_address].nameOfUser, superUserList[_address].position, superUserList[_address].uploadPermission);
    }
    
    function getNormalUser() view public returns(string _listCertificate){
        Certificate[] memory temp = certificateList[msg.sender];
        for(uint i = 0; i < temp.length; i++){
            string storage certs = temp[i].id temp[i].owner temp[i].name temp[i].createBy temp[i].certificateIPFS
            
        }
        certificateList[msg.sender]
    }
    
    function getCertificate(uint _idOfCertificate, address _CertificateOwnerAddress)
    public addressPermissionAuthority(_idOfCertificate)
    view returns(uint id, address owner, string name, address createBy, string certificateIPFS){
        Certificate[] memory temp = certificateList[_CertificateOwnerAddress];
        for ( uint i = 0; i < temp.length; i++){
            if(temp[i].id == _idOfCertificate){
                return (temp[i].id, temp[i].owner, temp[i].name, temp[i].createBy, temp[i].certificateIPFS);
            }
        }
    }
    
}