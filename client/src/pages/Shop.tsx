  import { BiSearch } from "react-icons/bi";
  import * as apiClient from "../api-client";
  import ShopCard from "../components/Shop/ShopCard";
  import { motion } from "framer-motion";
  import ShopSideBar from "../components/Shop/ShopSideBar";
  import { useSearchContext } from "../context/SearchContext";
  import { FormEvent, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { useQuery } from "react-query";
  import Pagination from '../components/Pagination';

  const Shop = () => {
      const navigate = useNavigate();
      const search = useSearchContext();
      const [model, setModel] = useState<string>(search.model);
      const [page, setPage] = useState<number>(1)

      const searchParams = {
        page: page.toString()
    }
    
    const { data: car } = useQuery(['getAllCar', searchParams], () => apiClient.getAllCars(searchParams), {
        keepPreviousData: true,
    });
    console.log(car)

      const handleSubmit = (event: FormEvent) => {
          event.preventDefault();
          search.saveSearchValues(model);
          navigate("/search");
      };

      return (
          <div className="flex h-screen">
              <motion.div
                  className="h-screen sticky top-0"
                  initial="closed"
                  animate="open"
              >
                  <ShopSideBar />
              </motion.div>

              <div className="flex-1 flex flex-col overflow-hidden">
                  <div className="sticky top-0 z-10 bg-offWhite border-b-gray-200 border-b-2">
                      <div className="max-w-md mx-auto p-4">
                          <form onSubmit={handleSubmit}>
                              <div className="relative">
                                  <input
                                      className="w-full border border-gray-400 rounded-md pr-10 pl-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                      type="text"
                                      name="search"
                                      placeholder="Type Model Name...."
                                      value={model}
                                      onChange={(e) => setModel(e.target.value)}
                                  />
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
      );
  };

  export default Shop;
