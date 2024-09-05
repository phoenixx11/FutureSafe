import { ethers } from "hardhat";

async function main() {
  // Get the ContractFactory for both contracts
  const CapsulePayment = await ethers.getContractFactory("CapsulePayment");
  const WhitelistSchemaHook = await ethers.getContractFactory("WhitelistSchemaHook");

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy the CapsulePayment contract
  const capsulePayment = await CapsulePayment.deploy();
  await capsulePayment.deployed(); // Wait for the contract to be mined
  console.log("CapsulePayment deployed to:", capsulePayment.address);

  // Deploy the WhitelistSchemaHook contract
  const whitelistHook = await WhitelistSchemaHook.deploy();
  await whitelistHook.deployed(); // Wait for the contract to be mined
  console.log("WhitelistSchemaHook deployed to:", whitelistHook.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });



