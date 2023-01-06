// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./RVLToken.sol";

contract ProjectFunding is Ownable {
    uint256 internal budget;
    string public projectName;
    RVLToken internal rvlToken;
    mapping(address=>uint256) private investors;
    event BudgetReached(uint256 budget, address funder, address miner);

    constructor(string memory _projectName, uint256 _budget, address _owner, address tokenAddress) {
        projectName = _projectName;
        budget = _budget;
        transferOwnership(_owner);
        rvlToken = RVLToken(tokenAddress);
    }

    modifier budgetNotReached {
        require(getRemainingBudget() > 0, 'Action Forbidden, Project Budget Already Reached !');
        _;
    }

    modifier acceptsFunding(uint256 amount) {
        require(getRemainingBudget() >= amount, 'Action Forbidden, Amount Exceeds Remaining Budget !');
        _;
    }

    function fundProject(uint256 amount) payable public acceptsFunding(amount) {
        rvlToken.transferFrom(msg.sender, address(this), amount);
        investors[msg.sender] += amount;
        if (this.getRemainingBudget() <=0 ) {
            emit BudgetReached(getBudget(), msg.sender, block.coinbase);
        }
    }

    function testAllowance() public view returns(uint256) {
        uint256 allowance = rvlToken.allowance(msg.sender, msg.sender);
        return allowance;
    }

    function refund(uint256 amount) payable public budgetNotReached {
        require(amount <= investors[msg.sender], 'YOU GOT CAUGHT YOU THIEF !');
        rvlToken.transfer(msg.sender, amount);
    }

    function updateBudget(uint256 newBudget) payable public onlyOwner{
        require(newBudget > address(this).balance, 'Proposed Budget is Lower Than Current Balalnce !');
        budget = newBudget;
    }

    function getBudget() public view returns (uint256) {
        return budget;
    }

    function getRemainingBudget() public view returns (uint256) {
        return getBudget() - rvlToken.balanceOf(address(this));
    }
}