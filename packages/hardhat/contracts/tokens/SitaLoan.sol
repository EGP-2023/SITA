//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract SitaLoan is ERC721, Ownable, ReentrancyGuard {
    using Strings for uint256;
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
        string farmerRegistrationURI;
    }

    struct FarmerLoan2LenderLoanArray {
        uint256 farmerLoanId;
        LenderLoanDetail[] lenderLoanDetails;
    }

    mapping(uint256 => FarmerLoanDetail) public farmerLoanDetails;
    mapping(uint256 => FarmerLoanDetail) public farmerLoanDetailsByTokenId;
    mapping(uint256 => LenderLoanDetail) public lenderLoanDetailsByTokenId;
    mapping(uint256 => FarmerLoan2LenderLoanArray) public farmerLoan2LenderLoanArray;

    uint256 public nextFarmerLoanDetailId = 1;
    uint256 public nextLenderLoanDetailId = 1;

    constructor( 
        string memory name, 
        string memory symbol,
        string memory initialURI
    ) ERC721(name, symbol) ReentrancyGuard() {
        
    }



// getProfileInformationForFarmer() [profile]

// getAllLoanDetailsForFarmers() [explore]

// getDetailsForFarmerDashboard() [farmer dashboard]
// payInstalmentFarmer() [farmer dashboard] 
// clamLoanForFarmer() [farmer dashboard]

// getDetailsForLenderDashboard() [lender dashboard]  
// withdrawUnclaimedForLender() [lender dashboard]


// submitLoanRequestForFarmer() [create loan request]
    function submitLoanRequestForFarmer(
        uint256 principleAmount,
        uint256 minInterest,
        uint256 maxInterest,
        uint256 term,
        uint256 creditValue,
        uint256 disbursmentDate,
        uint256 startDate,
        string calldata farmerRegistrationURI
    ) public returns (uint256) {
        FarmerLoanDetail memory newFarmerLoanDetail = FarmerLoanDetail({
            id: nextFarmerLoanDetailId,
            principleAmount: principleAmount,
            minInterest: minInterest,
            maxInterest: maxInterest,
            term: term,
            creditValue: creditValue,
            disbursmentDate: disbursmentDate,
            startDate: startDate,
            farmerRegistrationURI: farmerRegistrationURI
        });

        farmerLoanDetails[nextFarmerLoanDetailId] = newFarmerLoanDetail;
        
        nextFarmerLoanDetailId++;
        return nextFarmerLoanDetailId - 1;
    }

// submitLoanForLender( amount) [profile]
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
        FarmerLoanDetail memory newFarmerLoanDetail = farmerLoanDetails[farmerLoanId];
        
        _mint(msg.sender, nextLenderLoanDetailId);
        lenderLoanDetailsByTokenId[nextLenderLoanDetailId] = newLenderLoanDetail;
        farmerLoanDetailsByTokenId[nextLenderLoanDetailId] = newFarmerLoanDetail;

        nextLenderLoanDetailId++;

        return nextLenderLoanDetailId - 1;
    }

function createFarmerLoanDetail(
        uint256 principleAmount,
        uint256 minInterest,
        uint256 maxInterest,
        uint256 term,
        uint256 creditValue,
        uint256 disbursmentDate,
        uint256 startDate,
        string memory farmerRegistrationURI
    ) public returns (uint256) {
        FarmerLoanDetail memory newFarmerLoanDetail = FarmerLoanDetail({
            id: nextFarmerLoanDetailId,
            principleAmount: principleAmount,
            minInterest: minInterest,
            maxInterest: maxInterest,
            term: term,
            creditValue: creditValue,
            disbursmentDate: disbursmentDate,
            startDate: startDate,
            farmerRegistrationURI: farmerRegistrationURI
        });

        farmerLoanDetails[nextFarmerLoanDetailId] = newFarmerLoanDetail;
        
        nextFarmerLoanDetailId++;
        return nextFarmerLoanDetailId - 1;
    }

function getTokenURI(uint256 tokenId) public returns (string memory) {
        LenderLoanDetail memory _lenderLoanDetail = lenderLoanDetailsByTokenId[tokenId];
        FarmerLoanDetail memory _farmerLoanDetail = farmerLoanDetailsByTokenId[tokenId];

        // JSON data as a string
        string memory jsonDataFarmer = generateJSONDataFarmer(tokenId, _farmerLoanDetail);
        string memory jsonDataLender = generateJSONDataLender(tokenId, _lenderLoanDetail);

        string memory jsonData = string(abi.encodePacked(jsonDataFarmer, jsonDataLender));

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                bytes(Base64.encode(bytes(jsonData)))
            )
        );
    }


function generateJSONDataLender(
    uint256 tokenId,
    LenderLoanDetail memory _lenderLoanDetail
) public pure returns (string memory) {
    return string(
        abi.encodePacked(
            "{",
            "\"lenderLoanDetail\":{",
            "\"id\":", tokenId.toString(), ",",
            "\"farmerLoanId\":", _lenderLoanDetail.farmerLoanId.toString(), ",",
            "\"amount\":", _lenderLoanDetail.amount.toString(), ",",
            "\"interest\":", _lenderLoanDetail.interest.toString(),
            "},"
        )
    );
}    

function generateJSONDataFarmer(
    uint256 tokenId,
    FarmerLoanDetail memory _farmerLoanDetail
) public pure returns (string memory) {
    string memory farmerDataPart1 = generateFarmerDataPart1(_farmerLoanDetail);
    string memory farmerDataPart2 = generateFarmerDataPart2(_farmerLoanDetail);

    return string(
        abi.encodePacked("\"farmerLoanDetail\": {", farmerDataPart1, "}", ",", farmerDataPart2, "}")
    );
}

function generateFarmerDataPart1(FarmerLoanDetail memory _farmerLoanDetail) internal pure returns (string memory) {
    return string(
        abi.encodePacked(
            "\"id\":", _farmerLoanDetail.id.toString(), ",",
            "\"principleAmount\":", _farmerLoanDetail.principleAmount.toString(), ",",
            "\"term\":", _farmerLoanDetail.term.toString()
        )
    );
}

function generateFarmerDataPart2(FarmerLoanDetail memory _farmerLoanDetail) internal pure returns (string memory) {
    return string(
        abi.encodePacked(
            "\"creditValue\":", _farmerLoanDetail.creditValue.toString(), ",",
            "\"disbursmentDate\":", _farmerLoanDetail.disbursmentDate.toString(), ",",
            "\"startDate\":", _farmerLoanDetail.startDate.toString(), ",",
            "\"farmerRegistrationURI\":", _farmerLoanDetail.farmerRegistrationURI, "\""
        )
    );
}

}
