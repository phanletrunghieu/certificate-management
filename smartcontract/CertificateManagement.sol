// Name: CertificateManagement
//--------------------------------------------------------------------------------------
pragma solidity ^0.4.25;

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
        string content;
        string imgIPFS;
    }
    
    constructor() public payable{
        ownerOfSmartContract = msg.sender;
    }

    
    mapping (address => SuperUser) superUserList;
    mapping (address => Certificate[]) certificateList;
    mapping (uint => address[]) addressPermissionList;
    
    // check super user
    modifier superUserAuthority(){
        SuperUser storage authority = superUserList[msg.sender];
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
    
    
    function uploadCertificate(address _owner, string _name, string _content, string _imgIPFS) public superUserAuthorityPermission{
        uint _id = CertificateID + 1;
        Certificate memory cert = Certificate(_id ,_owner, _name, msg.sender, _content, _imgIPFS);
        certificateList[_owner].push(cert);
    }
    
    function getCertificate(uint _idOfCertificate, address _CertificateOwnerAddress)
    public addressPermissionAuthority(_idOfCertificate)
    view returns(uint id, address owner, string name, address createBy, string content, string imgIPFS){
        Certificate[] memory temp = certificateList[_CertificateOwnerAddress];
        for ( uint i = 0; i<temp.length; i++){
            if(temp[i].id == _idOfCertificate){
                return (temp[i].id, temp[i].owner, temp[i].name, temp[i].createBy, temp[i].content, temp[i].imgIPFS);
            }
        }
    }
    
}