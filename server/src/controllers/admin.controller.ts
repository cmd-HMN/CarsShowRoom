import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { Admin } from '../models/admin.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Cars, CarsType } from '../models/cars.model';
import cloudinary from 'cloudinary';

export const adminSignIn =async (req: Request, res: Response) => {

    const Error = validationResult(req.body)
    if(!Error.isEmpty()){
        return res.status(400).json({errors: Error.array()})
    }
    
    try {
    
        const {email, password} = req.body;
        const user = await Admin.findOne({email})

    if(!user) {
        return res.status(400).json({msg: "Email doesn't exits"})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.status(400).json({msg: "Invalid password"})
    }

    const token = jwt.sign({
        id: user.id
    }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: "1d"
    })

    res.cookie("admin_token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV != "development"
    })

    return res.status(200).send(user)
} catch (err) {
    return res.status(500).json({msg: err})
}
}

export const adminCarsFrom = async (req: Request, res: Response) => {
    try {


        const imageFiles = req.files as Express.Multer.File[]
        const newCar : CarsType = req.body

        if(imageFiles){

          
        const uploadPromises = imageFiles.map(async(image) => {

            const b64 = Buffer.from(image.buffer).toString("base64")

            const dataURI = `data:${image.mimetype};base64,${b64}`

            const res = await cloudinary.v2.uploader.upload(dataURI);

            return res.url
        })

        const imageUrls = await Promise.all(uploadPromises)
    

        newCar.imageUrls = imageUrls
    }

        newCar.updatedAt = new Date()

        newCar._id = req.userId

        const car = new Cars(newCar);

        await car.save()

        res.status(200).send(car)

    } catch(e) {

        console.log("Error creating car", e)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export const adminGetCar = async (req: Request, res: Response) => {

    const id = req.params.id.toString()

    try {

        const car = await Cars.findOne({
            _id: id,
            userId: req.userId
        })

        res.status(200).json(car)

    }catch(e) {

        res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export const adminEditCar = async (req:Request, res:Response) => {
    
    try
   { const updateCar: CarsType = req.body
    updateCar.updatedAt = new Date()

    const car = await Cars.findOneAndUpdate({
        _id: req.params.carId,
        userId: req.userId
    }, updateCar, {
        new: true
    })

    if(!car) {
        return res.status(404).json({
            message: "Car not found"
        })
    }

    const imageFiles = req.files as Express.Multer.File[]


    const uploadPromises = imageFiles.map(async(image) => {

        const b64 = Buffer.from(image.buffer).toString("base64")

        const dataURI = `data:${image.mimetype};base64,${b64}`

        const res = await cloudinary.v2.uploader.upload(dataURI);

        return res.url
    })

    const updatedImgUrls = await Promise.all(uploadPromises)

    car.imageUrls = [...updatedImgUrls, ...(updateCar.imageUrls || [])]

    await car.save()

    res.status(200).json(car)
}
    catch (e) {

        res.status(500).json({
            message: "Something went wrong"
        })
    }

}

export const featuredProduct = async (req: Request, res: Response) => {

    try {
        const car = await Cars.find().sort({sold: -1, like: -1}).limit(9)

        if(!car) { 
            return res.status(404).json({
                message: "Car not found"
            })
        }

        res.status(200).json(car)
    }catch(e) {

        res.status(500).json({
            message: "Something went wrong"
        })
    }
}
export const bestSellerProduct = async (req: Request, res: Response) => {

    try {
        const car = await Cars.find().sort({sold: -1}).limit(9)

        if(!car) { 
            return res.status(404).json({
                message: "Car not found"
            })
        }

        res.status(200).json(car)
    }catch(e) {

        res.status(500).json({
            message: "Something went wrong"
        })
    }
}
