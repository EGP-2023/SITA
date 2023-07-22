import { expect } from "chai";
import { BaseContract } from "ethers";
import { ethers } from "hardhat";
import { MockNFT, SitaAccount, SitaAccountRegistry } from "../typechain-types";
import ContractNames from "../util/contract-names";


const deployContract = async (contractName: string, contract: BaseContract): Promise<BaseContract> => {
  const [owner] = await ethers.getSigners();
  const contractFactory = await ethers.getContractFactory(contractName);
  contract = await contractFactory.deploy(owner.address);
  await contract.deployed();
  return contract;
}


describe("YourContract", function () {
  // We define a fixture to reuse the same setup in every test.

  let sitaAccount: SitaAccount;
  let sitaAccountRegistry: SitaAccountRegistry;
  let mockNFT: MockNFT;

  before(async () => {
    sitaAccount = (await deployContract(ContractNames.SITA_ACCOUNT, sitaAccount)) as SitaAccount;
    sitaAccountRegistry = (await deployContract(
      ContractNames.SITA_ACCOUNT_REGISTRY,
      sitaAccountRegistry,
    )) as SitaAccountRegistry;
    mockNFT = (await deployContract(ContractNames.SITA_ACCOUNT_REGISTRY, mockNFT)) as MockNFT;
    
  });

  describe("Deployment", function () {
    it("Should show token details", async function () {
      console.dir(sitaAccount);
      expect(await sitaAccount.token()).to.not.be.null;
    });
  });
});
