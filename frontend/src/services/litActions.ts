import LitJsSdk from 'lit-js-sdk';

const litNodeClient = new LitJsSdk.LitNodeClient();
await litNodeClient.connect();

export const encryptData = async (data: string) => {
  try {
    // Convert data to a Uint8Array
    const dataToEncrypt = LitJsSdk.uint8arrayFromString(data, 'utf8');
    
    // Encrypt the data using Lit
    const { encryptedData, symmetricKey } = await LitJsSdk.encryptString(dataToEncrypt);
    
    return { encryptedData, symmetricKey };
  } catch (error) {
    console.error('Error encrypting data:', error);
    throw new Error('Data encryption failed');
  }
};

