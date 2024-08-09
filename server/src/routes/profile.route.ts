import express from 'express';
import { addInCart, addInFav,DecFav,IncFav,IncSold, removeFromCart, removeFromFav } from '../controllers/profile.controller';
import verifyToken from '../middleware/auth.middleware';
const router = express.Router()


router.put('/cart/:userId/:carId', verifyToken, addInCart)

router.put('/sold/:carId', verifyToken, IncSold)

router.put('/IncFav/:carId',verifyToken,  IncFav)

router.put('/DecFav/:carId',verifyToken,  DecFav)

router.put('/favorite/:userId/:carId', verifyToken, addInFav)

router.put('/cart/remove/:userId/:carId', verifyToken, removeFromCart)

router.put('/fav/remove/:userId/:carId', verifyToken, removeFromFav)
export default router