import express, { Request, Response } from 'express';
import {  adminCarsFrom, adminEditCar, adminGetCar, adminSignIn, bestSellerProduct, featuredProduct, getAdminProfile } from '../controllers/admin.controller';
import { check, validationResult } from 'express-validator';
import adminVerifyToken from '../middleware/admin.middleware';
import multer from 'multer'
import { Cars } from '../models/cars.model';

const storage = multer.memoryStorage()

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

const router = express.Router()

router.post('/sign-in', [
    check("email", "Email is Required").isEmail(),
    check("password", "Password is Required and should have (A-Z)(NUMBER)(SPECIAL CHAR !@$#&^)").isLength({ min: 6 })
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        await adminSignIn(req, res);
    } catch (error) {
        console.error('Error in adminSignIn:', error);
        res.status(500).json({ message: "Something went wrong" });
    }
});


router.post('/sign-out', (req: Request ,res: Response) => {
    res.cookie("admin_token", "", {
        httpOnly: true,
        maxAge: 0,
        expires: new Date(0)
    })
    res.status(200).send()
})

router.get("/validate-token", adminVerifyToken, (req: Request, res: Response) => {
    res.status(200).json({
        message: "Token"
    })
})
router.get('/admId', adminVerifyToken , async(req:Request, res:Response)  => {
    res.status(200).json(req.userId)
})

router.get('/adminProfile/:id', getAdminProfile)

router.post("/form" ,upload.array("imageFiles", 6), adminCarsFrom)


router.get("/", adminVerifyToken,async (req:Request, res:Response) => {

    try{
        const car = await Cars.find({
            userId: req.userId
        })

        res.status(200).json({car})

    }catch (e) {
        res.status(500).json({
            message: "Something went wrong"
        })
    }
    
})


router.get("/featured-product", featuredProduct)

router.get("/best-seller-product", bestSellerProduct)

router.get("/:id", adminGetCar)

router.put("/:carId", adminVerifyToken, upload.array("imageFiles", 6), adminEditCar)

export default router