import express from 'express';
import { getAllCars, getLatestCars, getSearch } from '../controllers/shop.controller';
const router = express.Router()



router.get('/', getAllCars)

router.get('/latest', getLatestCars)

router.get('/search', getSearch)

export default router