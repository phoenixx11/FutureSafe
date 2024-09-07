import * as LitJsSdk from "@lit-protocol/lit-node-client";//
export class Lit {
  private litNodeClient: any;

  constructor(litNodeClient: any) {
    this.litNodeClient = litNodeClient;
  }

  async encryptToJson(data: {
    data: string;
    unlockDate: Date;
    authorizedUsers: string[];
    paymentRequired: boolean;
    holographicMessage?: string;
    memoryEnhancements?: string;
    visualTheme?: string;
  }, accessControlConditions: any) {
    // Serialize the data object into a JSON string
    const serializedData = JSON.stringify(data);

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