import { ethers } from "hardhat";

async function main() {
  // Get the ContractFactory for WhitelistSchemaHook
  const WhitelistSchemaHook = await ethers.getContractFactory("WhitelistSchemaHook");

  // Deploy the contract
  const whitelistSchemaHook = await WhitelistSchemaHook.deploy();

  // Wait for the deployment to complete
  await whitelistSchemaHook.deployed();

  // Output the address of the deployed contract
  console.log("WhitelistSchemaHook deployed to:", whitelistSchemaHook.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
