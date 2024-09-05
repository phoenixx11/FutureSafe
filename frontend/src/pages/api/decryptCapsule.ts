import { NextApiRequest, NextApiResponse } from 'next';
import { LitNodeClient } from 'lit-js-sdk';

const litClient = new LitNodeClient({ litNetwork: 'datil-dev' });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { attestationId, paymentStatus } = req.body;

    try {
      if (paymentStatus !== 'completed') {
        return res.status(400).json({ message: 'Payment not completed' });
      }

      // Retrieve and decrypt the key from Lit Protocol
      const encryptedData = await litClient.getDecryptionKey({ attestationId });

      res.status(200).json({ encryptedData });
    } catch (error) {
      console.error('Error during decryption:', error);
      res.status(500).json({ message: 'Failed to decrypt data' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
