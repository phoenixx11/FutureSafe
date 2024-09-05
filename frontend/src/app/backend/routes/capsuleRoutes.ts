// backend/routes/capsuleRoutes.ts
import { Router } from 'express';
import { createSchema, createAttestation, encryptAndAttest, processPayment } from '../controllers/capsuleController';

const router = Router();

router.post('/schemas', createSchema);
router.post('/attestations', createAttestation);
router.post('/encrypt-and-attest', encryptAndAttest);
router.post('/payments', processPayment);

export default router;
