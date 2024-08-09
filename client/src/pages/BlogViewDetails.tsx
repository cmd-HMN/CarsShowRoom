import { useQuery } from "react-query"
import * as apiClient from '../api-client';
import { useParams } from "react-router-dom";

interface blog {
    title: string
    description: string
    coverImage: string;
}
const BlogViewDetails = () => {

    const {blogId} = useParams()
    const {data: blog} = useQuery<blog>(['fetchBlogById', blogId], () => apiClient.fetchBlogById(blogId ?? ''))

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-row justify-center items-center text-orange-500 bg-Dark">
        <h1 className="text-xl sm:text-3xl font-bold p-3">Blogs</h1>
      </div>
      <div className="p-4 flex flex-row gap-8">
        { blog?.coverImage && 
      <img src={blog?.coverImage} className="w-1/3" alt="blog image" />
        }   
      <div className="w-2/3 flex justify-center items-center">
      <h1 className="text-lg flex font-semibold justify-center items-center sm:text-3xl">{blog?.title}</h1>
      </div>
      </div>
      <hr className="border-1 shadow-md shadow-gray-400 text-gray-300 w-full my-3" />
      <div className="p-4 flex flex-col justify-start items-start text-xs sm:text-sm">
      <h1 className="text-lg sm:text-3xl font-bold">Details</h1>
      { blog?.description && 
      <div  dangerouslySetInnerHTML={{ __html: blog?.description} }/>
} 
      </div>
      </div>

    )
}

export default BlogViewDetails