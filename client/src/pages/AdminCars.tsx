import { useQuery } from "react-query";
import AdmSideBar from "../components/Admin/AdmSideBar";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import * as apiClient from "../api-client";
import Pagination from "../components/Pagination";
import AdminShopCard from "../components/Admin/AdminShopCard";
import { Link, useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import { useLoadingContext } from "../context/LoadingContext";

const AdminCars = () => {
  const [model, setModel] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate()
  const  {setLoading} = useLoadingContext()
  const [initialLoadingDone, setInitialLoadingDone] = useState(false);
  //Same as Shop search use to get all car

  const searchPara = {
    model,
    company,
    page: page.toString(),
  };
  const { data: car, isLoading: getCarLoading} = useQuery(["getCars", searchPara], () =>
    apiClient.shopSearch_(searchPara)
  );

  const handleSubmit = () => {
    navigate('/admin/cars')
  };

  useEffect(() => {
    if (!initialLoadingDone && getCarLoading) {
      setLoading(true);
    } else if (!getCarLoading) {
      setLoading(false); 
      setInitialLoadingDone(true); 
    }
  }, [setLoading, getCarLoading, initialLoadingDone]);
  return (
    <div className="flex min-h-screen">
      <div className="sticky top-0 h-full">
        <AdmSideBar
          optionOne={false}
          optionTwo={false}
          optionThree={true}
          optionFour={false}
          optionFive={false}
          head="Add Cars"
        />
      </div>
      <div className="w-full h-full flex-col">
        <div className="flex justify-center items-center font-bold  sm:text-2xl text-lg text-orange-500">
          Add a Car
        </div>
        <div className="mt-8 flex justify-center items-center">
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
            <div className="mb-2">
              <Link
                to={"/admin/cars/form"}
                className="text-4xl text-orange-500"
              >
                <div className="relative group cursor-pointer">
                  <CiCirclePlus />
                  <div className="absolute -bottom-4 bg-black text-white text-xs p-2 rounded-md shadow-md transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    Add A New Car
                  </div>
                </div>
              </Link>
              <AdminShopCard
                carArray={car?.data}
                total={car?.pagination.total}
              />
              {car?.data && car?.pagination.total > 0 && (
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
    </div>
  );
};

export default AdminCars;
