import { SpMode, SignProtocolClient } from '@ethsign/sp-sdk';
import { ethers } from 'ethers';

const privateKey = process.env.PRIVATE_KEY;

if (!privateKey) {
  throw new Error('Please set the PRIVATE_KEY environment variable.');
}

const client = new SignProtocolClient(SpMode.OnChain, {
  provider: new ethers.providers.JsonRpcProvider(process.env.RPC_URL),
  signer: new ethers.Wallet(privateKey),
});

export const createTimeCapsuleSchema = async () => {
  try {
    const timeCapsuleSchema = await client.createSchema({
      name: 'Time Capsule with Whitelist Hook',
      description: 'Store data to be unlocked at a future date with whitelist control',
      attributes: [
        { name: 'data', type: 'string', description: 'Data to be stored' },
        { name: 'unlockDate', type: 'date', description: 'Date to unlock the capsule' },
        { name: 'authorizedUsers', type: 'address[]', description: 'Users authorized to unlock the capsule' },
      ],
      hookAddress: '0x7F513028Fc64a758CD96216d320b3dAa50791361', 
    });

    console.log('Schema created with Hook:', timeCapsuleSchema);
    return timeCapsuleSchema;
  } catch (error) {
    console.error('Failed to create schema with hook:', error);
  }
};

createTimeCapsuleSchema().catch(console.error);
