import { Request, Response } from "express";
import { User, UserType } from "../models/user.model";
import jwt from 'jsonwebtoken'
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';

export const signIn = async (req: Request, res: Response) => {

    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({errors: error.array()})
    }

    try{

    const { email, password} = req.body

    if (!email) {
        return res.status(400).json({msg: "Email is required"})
    }

    const user = await User.findOne({email})

    if(!user) {
        return res.status(404).json({msg: "Email doesn't exits"})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch) {
        return res.status(404).json({msg: "Invalid password"})
    }

    const token = jwt.sign({
        id: user.id
    }, process.env.JWT_SECRET_KEY as string, {
        expiresIn: "1d"
    })

    res.cookie("auth_token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV != "development"
    })

    return res.status(200).send(user);
    }catch (err) {
        return res.status(500).json({msg: err})
    }
}

export const newLetter = async (req:Request, res:Response) => {

    try{
    const {email} = req.body;

    const user = await User.findOne({
        email
    })

    if(!user) {
        return res.status(404).json({msg: "Email doesn't exits"})
    }
    else if(user.newLetter) {
        return res.status(400).json({msg: "Email already subscribed"})
    }
    else{
        user.newLetter = true
        await user.save()
        return res.status(200).json({msg: "Email subscribed"})
    }}
    catch(e){
    res.status(500).json('Something went wrong')
}
}

export const getProfile = async(req: Request, res:Response) => {

    try{
    const user = await User.findById(req.params.userId)

    return res.status(200).json(user)
    }
    catch(err) {
        return res.status(500).json({msg: err})
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const updateUser: UserType = req.body;
      updateUser.updatedAt = new Date();
      const { username, password } = req.body;
  
      const existingUser = await User.findById(userId.toString());
  
      if (!existingUser) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      if (existingUser.username == username) {
        return res.status(400).json("Username already exits")
      }
  
      if (password  == existingUser.password) {
          return res.status(400).json({ msg: "Password can't be same" })
        }
        
      if (password) {

        updateUser.password = await bcrypt.hash(password, 10)
      }
        const user = await User.findByIdAndUpdate(
            { _id: userId.toString() },
            updateUser,
         { new: true }
      );

      return res.status(200).json(user);
    } catch (err) {
        console.log(err)
      return res.status(500).json({ msg: err });
    }
  };
  