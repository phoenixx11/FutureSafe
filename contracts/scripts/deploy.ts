import { ethers } from "hardhat";

async function main() {
    // Get the ContractFactory and Signers here.
    const WhitelistSchemaHook = await ethers.getContractFactory("WhitelistSchemaHook");
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // Deploy the contract
    const whitelistHook = await WhitelistSchemaHook.deploy();

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
