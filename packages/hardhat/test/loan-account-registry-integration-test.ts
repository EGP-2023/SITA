import { expect } from "chai";
import { ethers } from "hardhat";
import { SitaAccount, SitaAccountRegistry } from "../typechain-types";
import ContractNames from "../util/contract-names";

describe("integration of all contracts", function () {
  // We define a fixture to reuse the same setup in every test.

  let sitaAccount: SitaAccount;
  let sitaAccountRegistry: SitaAccountRegistry;

  before(async () => {
    const sitaAccountCF = await ethers.getContractFactory(ContractNames.SITA_ACCOUNT);
    const sitaAccountRegistryCF = await ethers.getContractFactory(ContractNames.SITA_ACCOUNT_REGISTRY);

    sitaAccount = (await sitaAccountCF.deploy()) as SitaAccount;
    sitaAccountRegistry = (await sitaAccountRegistryCF.deploy()) as SitaAccountRegistry;
  });

  describe("Deployment", function () {
    it("Should show token details", async function () {
      console.dir(sitaAccount);
      expect(await sitaAccount.token()).to.not.be.null;
      expect(await sitaAccountRegistry.name()).to.eq("MockNFT");
    });
  });
});
