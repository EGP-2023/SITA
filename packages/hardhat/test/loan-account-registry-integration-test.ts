import { expect } from "chai";
import { BaseContract } from "ethers";
import { ethers } from "hardhat";
import { MockNFT, SitaAccount, SitaAccountRegistry } from "../typechain-types";
import ContractNames from "../util/contract-names";


const deployContract = async (contractName: string, contract: BaseContract): Promise<BaseContract> => {
  contract = await contractFactory.deploy(owner.address);
  await contract.deployed();
  return contract;
}


describe("integration of all contracts", function () {
  // We define a fixture to reuse the same setup in every test.

  let sitaAccount: SitaAccount;
  let sitaAccountRegistry: SitaAccountRegistry;
  let mockNFT: MockNFT;

  before(async () => {
    const [owner] = await ethers.getSigners();
    const sitaAccountCF = await ethers.getContractFactory(ContractNames.SITA_ACCOUNT);
    const sitaAccountRegistryCF = await ethers.getContractFactory(ContractNames.SITA_ACCOUNT_REGISTRY);
    const mockNFTCF = await ethers.getContractFactory(ContractNames.MOCK_NFT);

    sitaAccount = (await sitaAccountCF.deploy()) as SitaAccount;
    sitaAccountRegistry = (await sitaAccountRegistryCF.deploy()) as SitaAccountRegistry;
    mockNFT = (await mockNFTCF.deploy()) as MockNFT;


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
