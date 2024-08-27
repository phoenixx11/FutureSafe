import { ethers } from 'hardhat';

async function main() {
  const WhitelistSchemaHook = await ethers.getContractFactory('WhitelistSchemaHook');
  const whitelistHook = await WhitelistSchemaHook.deploy();
  await whitelistHook.deployed();

  console.log('WhitelistSchemaHook deployed to:', whitelistHook.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
