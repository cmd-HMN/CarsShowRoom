import { BiSearch } from "react-icons/bi";
import * as apiClient from "../api-client";
import ShopCard from "../components/Shop/ShopCard";
import { motion } from "framer-motion";
import ShopSideBar from "../components/Shop/ShopSideBar";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Pagination from "../components/Pagination";
import CategoryFilter from "../components/Shop/CategoryFilter";
import queryString from 'query-string';
const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation()

  const [show, setShow] = useState<boolean>(false);
  const [model, setModel] = useState<string>('');
  const [company, setCompany] = useState<string>(sessionStorage.getItem('company') || '');
  const [pageSize, setPageSize] = useState<number>(3)
  const [sort , setSort] = useState<string>(sessionStorage.getItem('sort') || '');
  const [maxPrice, setMaxPrice] = useState<string>(sessionStorage.getItem('maxPrice') || '')
  const [minPrice, setMinPrice] = useState<string>(sessionStorage.getItem('minPrice') || '')
  const [selectedCategory, setSelectedCategory] = useState<string[]>(JSON.parse(sessionStorage.getItem('category') || '[]'));
  const [page, setPage] = useState<number>(1);
  const ref = useRef<HTMLDivElement | null>(null)

  const toggleShow = () => {
    setShow(!show);
  };

  useEffect(() => {
    const homeQuery = queryString.parse(location.search)
    
    if (homeQuery.category) {
      const categoryString: string | null = Array.isArray(homeQuery.category) ? homeQuery.category[0] : homeQuery.category;

      try {
        if (categoryString != null) {
          const categories: string[] = JSON.parse(decodeURIComponent(categoryString));
          setSelectedCategory(categories);
        } else {
          setSelectedCategory([]);
        }
      } catch (error) {
        setSelectedCategory([]);
      }
    }
  }, [location.search])

  const searchParams = {
    model,
    company,
    pageSize: pageSize.toString(),
    page: page.toString(),
    category: selectedCategory,
    maxPrice: maxPrice,
    minPrice: minPrice,
    sort: sort?.toString()
  };

  const { data: car } = useQuery(
    ["search", searchParams],
    () => apiClient.shopSearch_(searchParams),
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
    navigate("/shop");
  };

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value);
    setPageSize(newSize);
  }
  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
  }
  const handleCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedCategory(prev =>
      prev.includes(value) ? prev.filter(cat => cat !== value) : [...prev, value]
    );
  };
  
  return (
    <div className="flex min-h-screen">
    <motion.div
      className="h-full sticky top-0"
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
            className={`fixed overflow-y-auto top-0 right-0 z-20 w-64 bg-white h-full shadow-lg transform transition-transform duration-300 ${show ? 'translate-x-0' : 'translate-x-full'}`}
            ref={ref}
          >
            <div className="p-4">
              <div className="flex justify-between items-center border-b pb-2 mb-4">
                <h2 className="text-sm text-white font-semibold bg-orange-500 p-1 shadow-md px-2">Filters</h2>
                <button
                  onClick={toggleShow}
                  className="text-gray-600 hover:text-gray-800"
                >
                  &times;
                </button>
              </div>
                <div className="mb-4">
                  <CategoryFilter category_={selectedCategory} onChange={handleCategory}/>
                </div>
                <div className="mb-4">
                  <label>
                    <span className="text-gray-700 font-bold text-xs">Max Price</span>
                    <div className="relative">
                    <input
                      type="text"
                      name="max Price"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="w-full border pl-4 border-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <span className="absolute left-0 ml-1 text-sm">$</span>
                    </div>
                  </label>
                </div>
                <div className="mb-4">
                  <label>
                    <span className="text-gray-700 font-bold text-xs">Min Price</span>
                    <div className="relative">
                    <input
                      type="text"
                      name="min Price"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full border pl-4 border-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                    />
                    <span className="absolute left-0 ml-1 text-sm">$</span>
                    </div>
                  </label>
                </div>
            </div>
          </div>

        </div>

      </div>
      <div className="flex-1 p-4 min-h-screen bg-offWhite">
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
        <div className="relative">
            <div className={`absolute top-0 left-0 z-10 ${show ?   'hidden' :'block' } gap-1`}>
                <label className="text-gray-700 text-xs mr-1 font-bold">Sort</label>
                <select
                className="border rounded text-gray-700 font-normal text-xs"
                onChange={(e) => handleSort(e)}
                >
                 <option>
                    Sort
                  </option>
                  {['rating', 'priceAsc', 'priceDsc'].map((num) => (
                  <option
                  value={num}
                  key={num}
                  >
                  {num}
                  </option>
                  ))}
                </select>
            </div>
        </div>
          <ShopCard carArray={car?.data} total={car?.pagination.total}/>
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
