import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";


const deployAccountContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("SitaAccount", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  await deploy("SitaAccountRegistry", {
    from: deployer,
    args: [],
    log: true,
    autoMine: true,
  });

  await deploy("DebtToken", {
    from: deployer,
    args: [1000000],
    log: true,
    autoMine: true,
  });

  await deploy("SitaLoan", {
    from: deployer,
    args: ["SitaLoan", "STLN", "Initial URI"], 
    log: true,
    autoMine: true,
  });

};

export default deployAccountContracts;

deployAccountContracts.tags = ["SitaAccount","SitaAccountRegistry","DebtToken", "SitaLoan"];
