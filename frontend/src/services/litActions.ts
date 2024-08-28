import LitJsSdk from 'lit-js-sdk';

const litClient = new LitJsSdk.LitNodeClient();
await litClient.connect();

export const encryptData = async (data: string, publicKey: string) => {
  try {
    const encryptedData = await LitJsSdk.encryptString(data, publicKey);
    return encryptedData;
  } catch (error) {
    console.error('Error encrypting data:', error);
    throw error;
  }
};

export const decryptData = async (encryptedData: string, accessControlConditions: any) => {
  try {
    const decryptedData = await litClient.decryptString(encryptedData, accessControlConditions);
    return decryptedData;
  } catch (error) {
    console.error('Error decrypting data:', error);
    throw error;
  }
};

export const signAndBroadcastTransaction = async (transactionData: any) => {
  try {
    const signedTransaction = await litClient.signTransaction(transactionData);
    const txHash = await litClient.broadcastTransaction(signedTransaction);
    console.log('Transaction Hash:', txHash);

    return txHash;
  } catch (error) {
    console.error('Error signing and broadcasting transaction:', error);
    throw error;
  }
};
