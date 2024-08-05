import mongoose from "mongoose"
import bcrypt from 'bcrypt'

export type UserType = {
    _id: string
    name: string
    username: string
    email: string
    password: string
    newLetter: boolean
    createdAt: Date
    updatedAt: Date
    cart: string[]
    favorite: string[]
}

const userSchema = new mongoose.Schema<UserType>({
    name: {type: String, required: true},
    username: {type: String, required: true, default: 'HMN'},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    newLetter: {type: Boolean, default: false},
    createdAt: {type: Date, required: true, default: Date.now()},
    updatedAt: {type: Date, required: true, default: Date.now()},
    cart: {type: [String], default: []},
    favorite: {type: [String], default: []}
})

userSchema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

export const User = mongoose.model<UserType>('User', userSchema)