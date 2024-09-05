// backend/controllers/capsuleController.ts
import { Request, Response } from 'express';
import { generateSchema } from '../services/schemaService';
import { createAttestationWithSchema } from '../services/attestationService';
import { encryptData } from '../services/encryptionService';
import { handlePayment } from '../services/paymentService';

// Schema creation
export const createSchema = async (req: Request, res: Response) => {
  try {
    const schemaId = await generateSchema(req.body);
    res.json({ schemaId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating schema' });
  }
};

// Attestation creation
export const createAttestation = async (req: Request, res: Response) => {
  try {
    const attestationId = await createAttestationWithSchema(req.body);
    res.json({ attestationId });
  } catch (error) {
    res.status(500).json({ error: 'Error creating attestation' });
  }
};

// Encrypt data and create attestation
export const encryptAndAttest = async (req: Request, res: Response) => {
  try {
    const encryptedData = await encryptData(req.body);
    const attestationId = await createAttestationWithSchema(encryptedData);
    res.json({ attestationId });
  } catch (error) {
    res.status(500).json({ error: 'Error encrypting and creating attestation' });
  }
};

// Payment processing
export const processPayment = async (req: Request, res: Response) => {
  try {
    const paymentStatus = await handlePayment(req.body);
    res.json({ paymentStatus });
  } catch (error) {
    res.status(500).json({ error: 'Error processing payment' });
  }
};
