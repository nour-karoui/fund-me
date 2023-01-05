// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import './ProjectFunding.sol';

contract ProjectsFactory {
    mapping(string=>address) public availableProjects;
    mapping(uint256=>string) public projectsNames;
    uint256 public projectsCount;
    constructor() {
        projectsCount = 0;
    }
    function createNewProject(string memory projectName, uint256 projectBudget, address tokenAddress) payable public {
        require(availableProjects[projectName] == address(0), 'This Project Already Exists');
        ProjectFunding project = new ProjectFunding(projectName, projectBudget, msg.sender, tokenAddress);
        availableProjects[projectName] = address(project);
        projectsNames[projectsCount] = projectName;
        projectsCount ++;
    }

    function getProjectAddress(string memory projectName) view public returns (address) {
        require(availableProjects[projectName] != address(0), 'This Project Does Not Exist');
        return availableProjects[projectName];
    }
}