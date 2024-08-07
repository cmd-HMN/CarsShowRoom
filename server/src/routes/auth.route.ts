import express from 'express';
import { Request, Response } from "express";
import  verifyToken  from "../middleware/auth.middleware";
import { getProfile, newLetter, signIn, updateUser } from '../controllers/auth.controller';
import { check } from 'express-validator';


const router = express.Router()

router.post('/sign-in',[
    check("email", "Email is Required").isEmail().normalizeEmail({gmail_remove_dots: true}),
    check("password", "Password is Required(should have (A-Z)(NUMBER)(SPECIAL CHAR !@$#&^)").isLength({min: 6}),
],signIn)

router.post("/sign-out", (req: Request, res:Response) => {
    res.cookie("auth_token", "", {
        httpOnly: true,
        maxAge: 0,
        expires: new Date(0)
    })
    res.send()
})

router.post('/news', newLetter)

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
    res.status(200).send({
        message: "Token"
    })
})

router.get("/", verifyToken, (req: Request, res:Response) => {
    res.status(200).json(req.userId)
})

router.get('/profile/:userId', getProfile)

router.put('/update/:userId', verifyToken, updateUser)
export default router