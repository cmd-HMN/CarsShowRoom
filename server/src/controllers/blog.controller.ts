import { Request, Response } from "express";
import { BlogModel } from '../models/blog.model';
import { ObjectId } from "mongodb";
import { v2 as cloudinary } from 'cloudinary';



export const blogUpload = async (req: Request, res:Response) => {

    try{
        const blog = req.body
        if(blog){
            const result = new BlogModel(blog)
            await result.save()
            res.status(200).json({message:"Blog uploaded successfully"})
    
        }
    }catch(e) {
        res.status(500).json(e)

    }
}

export const getBlog = async (req: Request, res: Response) => {
    try {
  
      const blogs = await BlogModel.find();
      if (blogs.length === 0) {
        res.status(404).json({ message: 'No blogs found' });
      } else {
        res.status(200).json(blogs);
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred', details: error });
    }
  };
  
export const trendingBlogs = async (req: Request, res: Response) => {
  try{
    const blogs = await BlogModel.aggregate([
      {
        $addFields: {
          trendingScore: {
            $add: [
              "$view",
              {
                $divide: [
                  { $subtract: [new Date(), "$createdAt"] },
                  1000 * 60 * 60 * 24
                ]
              }
            ]
          }
        }
      },
      { $sort: { trendingScore: -1 } },
      { $limit: 5 }
    ]);

    if (blogs.length === 0) {
      res.status(404).json({ message: 'No blogs found' });
    } else {
      res.status(200).json(blogs);
    }
  }
  catch(e) {
    res.status(500).json(e)
  }
}

export const latestBlogs = async (req: Request, res: Response) => {
  try{
    const blogs = await BlogModel.find().sort({createdAt: -1}).limit(5)
    if (blogs.length === 0) {
      res.status(404).json({ message: 'No blogs found' });
    } else {
      res.status(200).json(blogs);
    }
  }
  catch(e) {
    res.status(500).json(e)
  }
}

export const blogSearch = async(req:Request, res:Response) => {

  try {
      const query = await constructedSearchQuery(req.query)

      const pageSize = parseInt(req.query.pageSize ? req.query.pageSize.toString() : '3')
      const pageNumber = parseInt(req.query.page ? req.query.page.toString() : '1')
      const skip = (pageNumber - 1) * pageSize;
      const blog = await BlogModel.find(query).skip(skip).limit(pageSize).exec()

      const total = await BlogModel.countDocuments(query).exec()

      const response = {
          data: blog,
          pagination: {
              total: total,
              page: pageNumber,
              pages: Math.ceil(total / pageSize),
          },
      };
  
      res.status(200).json(response)

  }catch (err){
      console.log(err)
      res.status(500).json({message: "Error fetching blog", error: err})
  }
}


const constructedSearchQuery = (queryParams: any) => {

  let query: any = {}

  if(queryParams.title){
    query.title = new RegExp(queryParams.title, 'i')
  }

  return query
}
export const getBlogById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log("Blog ID:", id);

    const blog = await BlogModel.findOneAndUpdate(
      { _id: new ObjectId(id) }, 
      { $inc: { view: 1 } }, 
      { new: true }
    );

    if (!blog) {
      console.log("Blog not found");
      return res.status(404).json({ message: "Blog not found" });
    }

    console.log("Updated Blog:", blog);
    res.status(200).json(blog);
  } catch (e) {
    console.error("Error updating blog views:", e);
    res.status(500).json(e);
  }
}

export const coverImageUpload = async (req: Request, res: Response) => {
  try {
    
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const image = req.file as Express.Multer.File;

    const b64 = Buffer.from(image.buffer).toString("base64")
    const dataURI = `data:${image.mimetype};base64,${b64}`

    const result = await cloudinary.uploader.upload(dataURI, { resource_type: "auto" });

    res.status(200).json(result);

  } catch (e) {
    res.status(500).json(e);
  }
};
