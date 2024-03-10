// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

contract PasswordManager {

    struct Details {
        string appName;
        string username;
        string password;
        string link;
    }

    mapping (address => Details[] ) details;

    function addDetails(string calldata _appName, string calldata _username, string calldata _password, string calldata _link) public {
        details[msg.sender].push(Details({
            appName: _appName,
            username: _username,
            password: _password,
            link: _link
        }));
    }

    function getDetails() public view returns(Details[] memory) {
        return details[msg.sender];
    }

    function updateDetails(uint256 _detailsIndex, string calldata _newAppName, string calldata _newUsername, string calldata _newPassword, string calldata _newLink) public {
        require(_detailsIndex < details[msg.sender].length, "Invalid details index");
        details[msg.sender][_detailsIndex].appName = _newAppName;
        details[msg.sender][_detailsIndex].username = _newUsername;
        details[msg.sender][_detailsIndex].password = _newPassword;
        details[msg.sender][_detailsIndex].link = _newLink;
    }
  
    function deleteDetails(uint256 _detailsIndex) public {
        require(_detailsIndex < details[msg.sender].length, "Invalid details index");
        details[msg.sender][_detailsIndex] = details[msg.sender][details[msg.sender].length-1];
        details[msg.sender].pop();
    }

    function deleteAllDetails() public {
        delete details[msg.sender];
    } 
}
