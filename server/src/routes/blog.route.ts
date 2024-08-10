import express from 'express';
import { blogSearch, blogUpload, coverImageUpload, getBlog, getBlogById, latestBlogs, trendingBlogs } from '../controllers/blog.controller';
import adminVerifyToken from '../middleware/admin.middleware';
import multer from 'multer';

const router = express.Router()
const storage = multer.memoryStorage()

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 13 * 1024 * 1024
    }
})
    

router.post("/upload", adminVerifyToken, blogUpload)

router.get("/", getBlog)

router.get('/trending-blogs', trendingBlogs)

router.get('/latest-blogs', latestBlogs)

router.get('/search', blogSearch)

router.get('/:id', getBlogById)

router.post('/cloudinary-upload', upload.single('image') ,coverImageUpload)

export default router