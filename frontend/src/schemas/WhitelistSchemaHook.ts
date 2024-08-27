import { SpMode, SignProtocolClient } from '@ethsign/sp-sdk';
import { ethers } from 'ethers';

const privateKey = process.env.PRIVATE_KEY;
const hookContractAddress = process.env.HOOK_CONTRACT_ADDRESS; // Ensure this is set in your .env file

if (!privateKey || !hookContractAddress) {
  throw new Error('Please set the PRIVATE_KEY and HOOK_CONTRACT_ADDRESS environment variables.');
}

const client = new SignProtocolClient(SpMode.OnChain, {
  provider: new ethers.providers.JsonRpcProvider(process.env.RPC_URL),
  signer: new ethers.Wallet(privateKey),
});

export const integrateWhitelistHook = async () => {
  try {
    const schema = await client.createSchema({
      name: 'Time Capsule with Whitelist Hook',
      description: 'Store data to be unlocked at a future date with whitelist control',
      attributes: [
        { name: 'data', type: 'string', description: 'Data to be stored' },
        { name: 'unlockDate', type: 'date', description: 'Date to unlock the capsule' },
        { name: 'authorizedUsers', type: 'address[]', description: 'Users authorized to unlock the capsule' },
      ],
      hookAddress: hookContractAddress,
    });

    console.log('Schema created with Whitelist Hook:', schema);
    return schema;
  } catch (error) {
    console.error('Failed to create schema with hook:', error);
  }
};

integrateWhitelistHook().catch(console.error);
