import express from 'express';
import verifyToken from '../middleware/auth.middleware';
import { getAllReport, sendReport } from '../controllers/report.controller';
import adminVerifyToken from '../middleware/admin.middleware';
const router = express.Router()


router.post('/report', verifyToken, sendReport)

router.get('/report?',getAllReport)

export default router