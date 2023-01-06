// SPDX-License-Identifier: MIT

pragma solidity 0.8.17;

import "./RVLToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RVLFaucet is Ownable {
    RVLToken private token;
    uint256 constant amount = 1000000000000000000;

    constructor(address tokenAddress) {
        token = RVLToken(tokenAddress);
    }

    function fundAccount(address _address) payable public {
        require(token.balanceOf(address(this)) >= amount, "The faucet is dry, Sorry, Come back later when The plumber has fixed the leak!");
        token.transfer(_address, amount);
    }

    function fundFaucet(uint256 fundAmount) payable public {
        token.transferFrom(msg.sender, address(this), fundAmount);
    }

    function refundOwner() payable public onlyOwner {
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }
}