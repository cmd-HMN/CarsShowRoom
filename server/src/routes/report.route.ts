import express from 'express';
import verifyToken from '../middleware/auth.middleware';
import { sendReport } from '../controllers/report.controller';
const router = express.Router()


router.post('/report', verifyToken, sendReport)

export default router