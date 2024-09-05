import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// Define the deployment module for WhitelistSchemaHook
const WhitelistSchemaHookModule = buildModule("WhitelistSchemaHookModule", (m) => {
    // Define the contract deployment
    const whitelistSchemaHook = m.contract("WhitelistSchemaHook", []);

    // Return the deployed contract
    return { whitelistSchemaHook };
});

export default WhitelistSchemaHookModule;
