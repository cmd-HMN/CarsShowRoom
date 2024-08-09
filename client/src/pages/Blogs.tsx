import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';
import { FormEvent, useEffect, useState } from "react";
import Pagination from "../components/Pagination";
interface Blog_ {
  _id: string;
  title: string;
  description: string;
  coverImage: string
}
type BlogArray = Blog_[];

interface SearchBlog {
  data: BlogArray
  pagination: {
    total: number
    page: number
    pages: number
  }
}

const Blog = () => {
  const [title, setTitle] = useState<string>('')
  const [displaySearch, setDisplaySearch] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)

  const searchPara = {
    title,
    page: page.toString()
  }

  useEffect(() => {
    if (title) {
      setDisplaySearch(true)
    }
  } ,[title])
  useEffect(() => {
    sessionStorage.removeItem('title')
    setTitle('');
    setDisplaySearch(false)
  } ,[])


  const { data: blog } = useQuery<SearchBlog>(["getBlogs", searchPara], () => apiClient.blogSearch(searchPara));

  const navigate = useNavigate()
  const { data: trending } = useQuery<BlogArray>(
    "trendingBlog",
    apiClient.trendingBlog
  );
  const { data: latest } = useQuery<BlogArray>(
    "latestBlog",
    apiClient.latestBlog
  );
  const handleLink = (link: string) => {
    navigate(link)
  }
  const onSubmit = (e:FormEvent) => {
    e.preventDefault()
    sessionStorage.setItem('title', title)
    setDisplaySearch(true)
    navigate('/blogs')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
        <AnimatePresence
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}

        >
       
    <div className="flex flex-col min-h-screen">
        <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        >
      <div className="flex flex-row justify-center items-center text-orange-500 bg-Dark">
        <h1 className="text-xl sm:text-3xl font-bold p-3">Blogs</h1>
      </div>
      <div className="flex flex-row justify-center items-center text-sm text-Dark">
        <div className="relative mt-3 group">
          <form onSubmit={(e) => onSubmit(e)}>
          <div className="relative w-full">
            <label className="absolute -top-2 bg-white ml-2 font-bold text-[10px] sm:text-xs">
              Title
            </label>
            <input
              className="w-full border border-gray-400 rounded-md pr-10 py-1 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 border-r-0 focus:border-r-2"
              type="text"
              name="search"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <button className="absolute right-0 top-0 h-full bg-orange-500 hover:bg-orange-600 px-3 rounded-r-md transition-colors duration-300">
            <BiSearch className="text-white group-focus-within:scale-110 transition-transform duration-300" />
          </button>
          </form>
        </div>
      </div>
               
      <hr className="border-1 shadow-md shadow-gray-300 text-gray-300 w-full my-3" />
      </motion.div>
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >


{displaySearch && (
  <div>
    <h1 className="text-xl sm:text-3xl font-bold p-2">
      Searched <span className="text-orange-500 ml-1">Blogs</span>
    </h1>
    <div className="gap-2 p-2 flex flex-col flex-wrap sm:grid sm:grid-cols-3">
      {blog?.data && blog?.data.length > 0 ? (
        blog?.data.map((item) => (
          <div
            key={item._id}
            className="bg-slate-200 p-2 hover:p-4 transition-all duration-400 hover:bg-slate-300 cursor-pointer"
            onClick={() => handleLink(`/blogs/view-details/${item._id}`)}
          >
            <img
              className="w-full h-40 object-cover"
              src={item.coverImage}
              alt={item.title}
            />  
            <h2 className="text-Dark font-bold w-full max-h-28 mb-3">
              {item.title}
            </h2>
            <p className="text-Dark font-medium w-full max-h-28">
              <span
                className="text-orange-500 font-thin ml-1 line-clamp-2 hover:line-clamp-3"
                dangerouslySetInnerHTML={{ __html: item.description }}
              />
            </p>
          </div>
        ))
      ) : (
        <h1 className="text-xl sm:text-3xl p-2 text-center">No results found</h1>
      )}
    </div>
    {blog?.pagination.total && 
    <Pagination 
    page={blog?.pagination.page ?? 0}
    pages={blog?.pagination.pages ?? 0}
    onPageChange={setPage}
    />
}
  </div>
)}


      <div className="p-3 b-0">
        <h1 className="text-xl sm:text-3xl font-bold">
          Trending <span className="text-orange-500 ml-1">Blogs</span>
        </h1>
        <div className="space-y-2 mt-3">
          {trending?.map((item) => (
            <div
              key={item._id}
              className="bg-slate-200 p-2 hover:p-4 transition-all duration-400 hover:bg-slate-300 cursor-pointer"
              onClick={() => handleLink(`/blogs/view-details/${item._id}`)}
            >
              <div className="flex flex-row flex-wrap justify-start gap-3">
                <img src={item.coverImage} width={'200px'}/>
                <div>
              <h2 className="text-Dark font-bold w-full max-h-28 mb-3">
              {item.title}
              </h2>
              <p className="text-Dark font-medium w-full max-h-28">
                <span
                  className="text-orange-500 font-thin ml-1 line-clamp-2 hover:line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
              </p>
            </div>
            </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="border-1 shadow-md shadow-gray-300 text-gray-300 w-full my-3" />
      <div className="p-3 b-0">
        <h1 className="text-xl sm:text-3xl font-bold">
          Latest <span className="text-orange-500 ml-1">Blogs</span>
        </h1>
        <div className="space-y-2 mt-3">
          {latest?.map((item) => (
           <div
           key={item._id}
           className="bg-slate-200 p-2 hover:p-4 transition-all duration-400 hover:bg-slate-300 cursor-pointer"
           onClick={() => handleLink(`/blogs/view-details/${item._id}`)}
         >
           <div className="flex flex-row flex-wrap justify-start">
             <img src={item.coverImage} width={'200px'}/>
             <div>
           <h2 className="text-Dark font-bold w-full max-h-28 mb-3">
           {item.title}
           </h2>
           <p className="text-Dark font-medium w-full max-h-28">
             <span
               className="text-orange-500 font-thin ml-1 line-clamp-2 hover:line-clamp-3"
               dangerouslySetInnerHTML={{ __html: item.description }}
             />
           </p>
         </div>
         </div>
         </div>
          ))}
        </div>
      </div>
    </motion.div>
    </div>
        </AnimatePresence>
    </motion.div>
  );
};

export default Blog;
