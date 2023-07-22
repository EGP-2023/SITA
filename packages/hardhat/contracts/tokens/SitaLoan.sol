//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SitaLoan is ERC721, Ownable, ReentrancyGuard {
    struct LenderLoanDetail {
        uint256 id;
        uint256 farmerLoanId;
        uint256 amount;
        uint256 interest;
    }
    
    struct FarmerLoanDetail {
        uint256 id;
        uint256 principleAmount;
        uint256 minInterest;
        uint256 maxInterest;
        uint256 term;
        uint256 creditValue;
        uint256 disbursmentDate;
        uint256 startDate;
    }

    struct FarmerLoan2LenderLoanArray {
        uint256 farmerLoanId;
        LenderLoanDetail[] lenderLoanDetails;
    }

    mapping(uint256 => FarmerLoanDetail) public farmerLoanDetails;
    mapping(uint256 => FarmerLoan2LenderLoanArray) public farmerLoan2LenderLoanArray;

    uint256 public nextFarmerLoanDetailId = 1;
    uint256 public nextLenderLoanDetailId = 1;

    constructor( 
        string memory name, 
        string memory symbol,
        string memory initialURI
    ) ERC721(name, symbol) ReentrancyGuard() {
        
    }

    function createFarmerLoanDetail(
        uint256 principleAmount,
        uint256 minInterest,
        uint256 maxInterest,
        uint256 term,
        uint256 creditValue,
        uint256 disbursmentDate,
        uint256 startDate
    ) public returns (uint256) {
        FarmerLoanDetail memory newFarmerLoanDetail = FarmerLoanDetail({
            id: nextFarmerLoanDetailId,
            principleAmount: principleAmount,
            minInterest: minInterest,
            maxInterest: maxInterest,
            term: term,
            creditValue: creditValue,
            disbursmentDate: disbursmentDate,
            startDate: startDate
        });

        farmerLoanDetails[nextFarmerLoanDetailId] = newFarmerLoanDetail;
        
        nextFarmerLoanDetailId++;
        return nextFarmerLoanDetailId - 1;
    }

    function createLenderLoanDetail(
        uint256 farmerLoanId,
        uint256 amount,
        uint256 interest
    ) public returns (uint256) {
        LenderLoanDetail memory newLenderLoanDetail = LenderLoanDetail({
            id: nextLenderLoanDetailId,
            farmerLoanId: farmerLoanId,
            amount: amount,
            interest: interest
        });

        farmerLoan2LenderLoanArray[farmerLoanId].lenderLoanDetails.push(newLenderLoanDetail);
        
        _mint(msg.sender, nextLenderLoanDetailId);

        nextLenderLoanDetailId++;
        return nextLenderLoanDetailId - 1;
    }
}
