//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DebtToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("DebtToken", "DTK") {
        _mint(msg.sender, initialSupply);
    }

    function transferTo(address recipient, uint256 amount) public returns (bool) {
    return super.transfer(recipient, amount);
    }

}
