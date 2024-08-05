import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';

declare global {
    namespace Express {
        interface Request {
            userId: string
        }
    }
}

const adminVerifyToken = async (req:Request, res: Response, next: NextFunction) => {

    const token = req.cookies["admin_token"]

    if(!token) {
        return res.status(401).json({  
            message: "Unauthorized"
        })
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
        req.userId = (decode as JwtPayload).userId
        next()

    }catch (err) {
        return res.status(500).json({
            message: "catch Unauthorized"
        })
    }
}

export default adminVerifyToken