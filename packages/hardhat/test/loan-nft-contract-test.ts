const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SitaLoan", function () {
  let sitaLoan;
  let owner;
  let lender;
  let tokenId;

  beforeEach(async () => {
    [owner, lender] = await ethers.getSigners();

    const SitaLoan = await ethers.getContractFactory("SitaLoan");
    sitaLoan = await SitaLoan.deploy("SitaLoan", "SLN", "<initialURI>");
    await sitaLoan.deployed();

    // Create a new farmer loan request
    await sitaLoan.submitLoanRequestForFarmer(
      1000, // principleAmount
      20,   // minInterest
      20,   // maxInterest
      24,   // term
      1,  // creditValue
      543262432, // disbursmentDate
      543262432, // startDate
      "<//:nft.storage uri>" // farmerRegistrationURI
    );

    tokenId = 1;

    // Create a lender loan detail
    await sitaLoan.connect(lender).createLenderLoanDetail(tokenId, 100, 1);
  });

  it("should return correct metadata in JSON format", async function () {
    // Get the token URI
    const tokenURI = await sitaLoan.getTokenURI(tokenId);

    // Expected metadata JSON string
    const expectedMetadata = `{
      "lenderLoanDetail":{
        "id":${tokenId},
        "farmerLoanId":${tokenId},
        "amount":100,
        "interest":1
      },
      "farmerLoanDetail": {
        "id":${tokenId},
        "principleAmount":1000,
        "minInterest":20,
        "maxInterest":20,
        "term":24,
        "creditValue":0.8,
        "disbursmentDate":543262432,
        "startDate":543262432,
        "farmerRegistrationURI":"<//:nft.storage uri>"
      }
    }`;

    console.log(tokenURI);

    // Compare the tokenURI with the expected metadata
    expect(tokenURI).to.equal(`data:application/json;base64,${Buffer.from(expectedMetadata).toString("base64")}`);
  });
});