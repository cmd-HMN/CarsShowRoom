import mongoose from "mongoose";
import bcrypt from 'bcrypt';


export type adminType = {
    _id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}


const adminSchema =  new mongoose.Schema<adminType>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    createdAt: {type: Date, required: true, default: Date.now()},
    updatedAt: {type: Date, required: true, default: Date.now()}
})

adminSchema.pre("save", async function (next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password ,10)
    }
    next()
})

export const Admin = mongoose.model<adminType>("Admin", adminSchema)