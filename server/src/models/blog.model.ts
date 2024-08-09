import mongoose from "mongoose";

export type BlogType = {
    _id: string;
    coverImage: string
    title: string;
    description: string;
    like: number;
    view: number;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    title: {type: String, required: true},
    description: {type: String, required: true},
    coverImage: {type: String},
    like: {type:Number, default: 0},
    view: {type:Number, default: 0},
    createdAt: {type: Date, default: new Date()},
    updatedAt: {type: Date, default: new Date()}
})

export const BlogModel = mongoose.model<BlogType>("Blog", BlogSchema)