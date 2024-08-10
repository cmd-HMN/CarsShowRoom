import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { User } from "../models/user.model";
import jwt from 'jsonwebtoken'

export const signUp = async (req: Request, res: Response) => {
    const error = validationResult(req)
    if (!error.isEmpty()){
        return res.status(400).json({errors: error.array()})
    }

    try {
    
        const {email} = req.body

        const user = await User.findOne({email})

        if(user) {
            return res.status(404).json({msg: "User already exists"})
        }

        const newUser = new User(req.body)
        await newUser.save()

        const token = jwt.sign({
            id: newUser._id
        }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d"
        })

        res.cookie("auth_token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            secure: process.env.NODE_ENV != "development"
        })
        
        return res.status(200).json({msg: "success", token})
    
    } catch (error) {
        return res.status(500).json({msg: error})
    }
}

