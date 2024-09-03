import express, { Request, Response } from 'express';
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import userRouter from './routes/user.route'
import authRouter from './routes/auth.route'
import adminRouter from './routes/admin.route'
import cookieParser from 'cookie-parser'
import {v2 as cloudinary} from 'cloudinary';
import path from 'path';
import profileRouter from './routes/profile.route'
import reportRouter from './routes/report.route'
import shopRouter from './routes/shop.route'
import blogRouter from './routes/blog.route'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express();
app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,

}))

app.use(express.static(path.join(__dirname ,"../../client/dist")))


app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URL as string).then(() => {
    console.log("Server is up")
})
app.use('/new-user', userRouter)
app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/profile', profileRouter)
app.use('/api/contact-us', reportRouter)
app.use('/api/shop', shopRouter)
app.use('/api/blog', blogRouter)    


// {app.get('*', (req:Request, res:Response) => {
//     res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
// })}
app.listen(3000)