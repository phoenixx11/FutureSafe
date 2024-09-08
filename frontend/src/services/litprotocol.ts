// services/litActions.ts
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { Signer } from "ethers";

// Define the Lit client instance
const litNodeClient = new LitJsSdk.LitNodeClient({
  alertWhenUnauthorized: true, 
});

await litNodeClient.connect(); // Make sure to connect to the Lit node

interface AccessControlCondition {
  contractAddress: string;
  standardContractType: string;
  chain: string;
  method: string;
  parameters: string[];
  returnValueTest: {
    comparator: string;
    value: string;
  };
}

export async function decryptDataWithLitAction(
  accessControlConditions: AccessControlCondition[],
  ciphertext: string,
  dataToEncryptHash: string,
  signer: Signer // Add the signer parameter to handle authentication
) {
  try {
    // Get the address of the signer (user's wallet address)
    const userAddress = await signer.getAddress();

    // Sign the authentication message
    const authSig = await LitJsSdk.checkAndSignAuthMessage({
      chain: 'ethereum', // Replace with the correct chain if needed
      signer,
    });

    // Decrypt the data using LitJsSdk
    const decryptedData = await LitJsSdk.decryptFromJson(
      {
        accessControlConditions,
        encryptedData: ciphertext,
        chain: 'ethereum', // Replace with the correct chain if needed
        authSig,
      },
      litNodeClient
    );

    // Optionally, validate the data to ensure it's correct
    if (dataToEncryptHash !== LitJsSdk.hash(decryptedData)) {
      throw new Error("Decryption failed: data hash mismatch.");
    }

    return JSON.parse(decryptedData);
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error("Failed to decrypt data");
  }
}
