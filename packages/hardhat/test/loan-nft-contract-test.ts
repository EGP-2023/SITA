import { expect } from "chai";
import { ethers } from "hardhat";
import { SitaLoan } from "../typechain-types";
import ContractNames from "../util/contract-names";

describe("test loan nft", function () {
  // We define a fixture to reuse the same setup in every test.

  let sitaLoan: SitaLoan;

  before(async () => {
    const sitaLoanCF = await ethers.getContractFactory(ContractNames.SITA_LOAN);
    // Replace arg1, arg2, etc., with the actual constructor arguments required by SitaLoan contract
    sitaLoan = (await sitaLoanCF.deploy(arg1, arg2, ...)) as SitaLoan;
    await sitaLoan.deployed();
  });
  
  describe("Deployment", function () {
    it("Should show contract details", async function () {
      const name = await sitaLoan.name();
      expect(name).to.eq(ContractNames.SITA_LOAN);
    });
  });
});