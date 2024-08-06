import { BiSearch } from "react-icons/bi";
import * as apiClient from "../api-client";
import ShopCard from "../components/Shop/ShopCard";
import { motion } from "framer-motion";
import ShopSideBar from "../components/Shop/ShopSideBar";
import { useSearchContext } from "../context/SearchContext";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Pagination from "../components/Pagination";

const Shop = () => {
  const navigate = useNavigate();
  const search = useSearchContext();
  const [show, setShow] = useState<boolean>(false);
  const [model, setModel] = useState<string>(search.model);
  const [company, setCompany] = useState<string>(search.company);
  const [pageSize, setPageSize] = useState<number>(5)
  const [page, setPage] = useState<number>(1);
  const ref = useRef<HTMLDivElement | null>(null)

  const toggleShow = () => {
    setShow(!show);
  };

  const searchParams = {
    model,
    company,
    pageSize: pageSize.toString(),
    page: page.toString(),
  };

  const { data: car } = useQuery(
    ["getAllCar", searchParams],
    () => apiClient.getAllCars(searchParams),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node)
    ) {
          setShow(false);
      }
    };
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(model, company);
    navigate("/search");
  };

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value);
    setPageSize(newSize);
  }
  return (
    <div className="flex h-screen">
    <motion.div
      className="h-auto sticky top-0"
      initial="closed"
      animate="open"
    >
      <ShopSideBar />
    </motion.div>

    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="sticky top-0 z-10 bg-offWhite border-b-gray-200 border-b-2">
        <div
          className={`absolute right-1 bottom-0 cursor-pointer ${show ? 'z-0' : 'z-10'}`}
          style={{ pointerEvents: 'auto' }}
          onClick={toggleShow}
        >
          <div className="text-orange-500 text-xs mt-1 sm:text-sm">
            Filters
          </div>
        </div>
        <div className="relative">
          <div className="max-w-md mx-auto p-4">
            <form onSubmit={handleSubmit}>
              <div className="relative flex-row flex">
                <div className="relative w-full">
                  <label className="absolute -top-2 bg-white ml-2 font-bold text-[10px] sm:text-xs">
                    Model
                  </label>
                  <input
                    className="w-full border border-gray-400 pr-10 py-1 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 border-r-0 focus:border-r-2"
                    type="text"
                    name="search"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                </div>
                <div className="relative w-full">
                  <label className="absolute -top-2 bg-white ml-2 font-bold text-[10px] sm:text-xs">
                    Company
                  </label>
                  <input
                    className="w-full border border-gray-400 pr-10 py-1 focus:outline-none rounded-r-md focus:ring-1 focus:ring-orange-500 focus:border-orange-500 border-l-0 focus:border-l-2"
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
          
          <div
            className={`fixed inset-0 z-20 bg-gray-800 bg-opacity-50 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0 hidden'}`}
            onClick={toggleShow}
          />
          <div
            className={`fixed top-0 right-0 z-20 w-64 bg-white h-full shadow-lg transform transition-transform duration-300 ${show ? 'translate-x-0' : 'translate-x-full'}`}
            ref={ref}
          >
            <div className="p-4">
              <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="text-sm font-semibold">Filters</h2>
                <button
                  onClick={toggleShow}
                  className="text-gray-600 hover:text-gray-800"
                >
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-1  text-xs font-bold">Rating</label>
                  <input
                    type="checkbox"
                    className="w-full border p-1 rounded-md"
                    placeholder="Enter model"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-500 text-white p-1 rounded-md"
                >
                  Apply Filters
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-offWhite">
        <div className="relative">
            <div className={`absolute top-0 right-0 z-10 ${show ?   'hidden' :'block' } gap-1`}>
                <label className="text-gray-700 text-xs mr-1 font-bold">page Size</label>
                <select
                className="border rounded text-gray-700 font-normal text-xs"
                onChange={(e) => handlePageSize(e)}
                >
                  {[3, 5, 15, 20, 25, 50].map((num) => (
                  <option
                  value={num}
                  key={num}
                  >
                  {num}
                  </option>
                  ))}
                </select>
            </div>
          <ShopCard carArray={car?.data} />
          {car?.pagination.total && (
            <Pagination
              page={car?.pagination.page}
              pages={car?.pagination.pages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </div>
  </div>    
  );
};

export default Shop;
