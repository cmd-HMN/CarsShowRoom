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

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)

        if (typeof decoded === 'object' && 'id' in decoded) {
            req.userId = decoded.id
            next();
        } else {
            throw new Error("Invalid token");
        }

    }catch (err){
        return res.status(401).json({
            message: "Unauthorized"
        })
        
    }
}

export default adminVerifyToken