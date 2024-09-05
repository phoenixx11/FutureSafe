// backend/routes/someRoute.ts
import express from 'express';
import arweave from '../services/arweaveService';

const router = express.Router();

router.post('/registerSchema', async (req, res) => {
  try {
    const schemaData = {
      name: "CreateCapsule",
      data: [
        { name: "data", type: "string" },
        { name: "unlockDate", type: "string" },
        { name: "authorizedUsers", type: "address[]" },
      ],
    };

    const response = await arweave.transactions.post(schemaData);
    res.json({ message: 'Schema registered', response });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register schema on-chain', details: error.message });
  }
});

export default router;
