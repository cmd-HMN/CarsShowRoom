import express from 'express';
import { getLatestCars, shopSearch } from '../controllers/shop.controller';
const router = express.Router()



router.get('/search', shopSearch)

router.get('/latest', getLatestCars)

export default router