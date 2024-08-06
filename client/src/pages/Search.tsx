import { useQuery } from "react-query"
import { useSearchContext } from "../context/SearchContext"
import * as apiClient from '../api-client'
import { FormEvent, useState } from "react"
import { motion } from 'framer-motion';
import ShopSideBar from "../components/Shop/ShopSideBar";
import ShopCard from "../components/Shop/ShopCard";
import Pagination from "../components/Pagination";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const Search = () => {

    const navigate = useNavigate()
    const search = useSearchContext()
    const [model, setModel] = useState<string>(search.model);
    const [company, setCompany] = useState<string>(search.company);
    const [page, setPage] = useState<number>(1)

    const searchParams = {
        model: search.model,
        company: search.company,
        page: page.toString()
    }

    const {data: car} = useQuery(["search", searchParams], () => apiClient.shopSearch(searchParams))
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(model, company)
        navigate("/search");
    };
    return (
        <div className="flex h-auto">
              <motion.div
                  className="h-auto sticky top-0"
                  initial="closed"
                  animate="open"
              >
                  <ShopSideBar />
              </motion.div>

              <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="sticky top-0 z-10 bg-offWhite border-b-gray-200 border-b-2">
                      <div className="max-w-md mx-auto p-4">
                          <form onSubmit={handleSubmit}>
                              <div className="relative flex-row flex">
                                <div className="relative">
                                <label 
                                className="absolute -top-2 bg-white ml-2 font-bold text-[10px] sm:text-xs"
                                >
                                    Model
                                </label>
                                  <input
                                      className="w-full border border-gray-400 border-r-0 pr-10 py-1 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 focus:border-r-2"
                                      type="text"
                                      name="search"
                                      value={model}
                                      onChange={(e) => setModel(e.target.value)}
                                  />
                                </div>
                                <div className="relative">
                                <label 
                                className="absolute -top-2 bg-white ml-2 font-bold text-[10px] sm:text-xs"
                                >
                                Company
                                </label>
                                  <input
                                      className="w-full border border-gray-400 border-l-0  pr-10 py-1 focus:outline-none rounded-r-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                      type="text"
                                      name="search"
                                      value={company}
                                      onChange={(e) => setCompany(e.target.value)}
                                  />
                                </div>
                                  <button className="absolute right-0 top-0 h-full bg-orange-500 hover:bg-orange-600 px-3 rounded-r-md transition-colors duration-300">
                                      <BiSearch className="text-white group-focus-within:scale-110 transition-transform duration-300" />
                                  </button>
                              </div>
                          </form>
                      </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 bg-offWhite">
                          <div>
                              <ShopCard carArray={car?.data} />
                              {car?.pagination.total && 
                              <Pagination 
                                  page={car?.pagination.page} 
                                  pages={car?.pagination.pages} 
                                  onPageChange={setPage} 
                              />
                              }
                          </div>                          
                  </div>
              </div>
          </div>
    )
}

export default Search