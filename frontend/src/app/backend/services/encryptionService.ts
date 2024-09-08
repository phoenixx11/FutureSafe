import * as LitJsSdk from "@lit-protocol/lit-node-client";//
export class Lit {
  private litNodeClient: any;

  constructor(litNodeClient: any) {
    this.litNodeClient = litNodeClient;
  }

  async encryptToJson(data: {
    data: '';
    unlockDate: '';
    authorizedUsers: '';
    holographicMessage?: '';
    memoryEnhancements?: '';
    visualTheme?: '';
  }, accessControlConditions: any) {
    // Serialize the data object into a JSON string
    const serializedData = JSON.stringify(data);
 
    // Handle dataToEncryptHash as needed
    const dataToEncryptHash = encryptedData.dataToEncryptHash;
    console.log('Data to Encrypt Hash:', dataToEncryptHash);

    // Encrypt the data and return as JSON
    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptToJson(
      {
        accessControlConditions,
        dataToEncrypt: serializedData,
      },
      this.litNodeClient
    );

    return {
      ciphertext,
      dataToEncryptHash
    };
  }
}