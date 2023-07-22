//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SitaLoan is ERC721, Ownable, ReentrancyGuard {
    struct LenderLoanDetail {
        uint256 amount;
        uint256 interest;
    }
    
    struct FarmerLoanDetail {
        uint256 principleAmount;
        uint256 minInterest;
        uint256 maxInterest;
        uint256 term;
        uint256 creditValue;
        uint256 disbursmentDate;
        uint256 startDate;
    }

    mapping(uint256 => FarmerLoanDetail) public farmerLoanDetails;
    mapping(uint256 => LenderLoanDetail) public lenderLoanDetails;
    mapping(uint256 => uint256) public loanMappings;

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
        uint256 amount,
        uint256 interest
    ) public returns (uint256) {
        LenderLoanDetail memory newLenderLoanDetail = LenderLoanDetail({
            amount: amount,
            interest: interest
        });

        lenderLoanDetails[nextLenderLoanDetailId] = newLenderLoanDetail;
        
        nextLenderLoanDetailId++;
        return nextLenderLoanDetailId - 1;
    }

    function mapLoanDetails(uint256 lenderLoanDetailId, uint256 farmerLoanDetailId) public {
        loanMappings[lenderLoanDetailId] = farmerLoanDetailId;
    }

}
