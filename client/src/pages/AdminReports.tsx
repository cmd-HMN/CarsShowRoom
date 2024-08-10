import { useEffect, useState } from "react";
import AdmSideBar from "../components/Admin/AdmSideBar";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "../context/LoadingContext";

interface ReportData {
  _id:string
  userId: string;
  detail: string;
  submitAt: Date;
  resolved: number;
}

interface Data {
  data: ReportData[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}
const AdminReports = () => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(3);
  const [sort, setSort] = useState<string>(
    sessionStorage.getItem("sort") || ""
  );
  const navigate = useNavigate()
  const {setLoading} = useLoadingContext()

  const searchPara = {
    page: page.toString(),
    pageSize: pageSize.toString(),
    sort
  };

  const { data: report, isLoading: getReportLoading} = useQuery<Data>(["getReport", searchPara], () =>
    apiClient.getReport(searchPara)
  );
  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value);
    setPageSize(newSize);
  };
  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value);
    console.log(event.target.value)
  };

  const handleLink = (id:string) => {
    navigate(`/admin/reports/${id}`)
  }

  useEffect(() => {
    setLoading(getReportLoading)
  }, 
  [getReportLoading, setLoading]
)
  return (
    <div className="flex min-h-screen">
    <AdmSideBar
      optionOne={false}
      optionTwo={true}
      optionThree={false}
      optionFour={false}
      optionFive={false}
      head={"Reports"}
    />
    <div className="w-full flex-1 flex flex-col">
      <div className="flex justify-center items-center p-3 font-bold text-lg sm:text-2xl text-orange-500">
        Reports
      </div>
      <div className="p-3 flex justify-between items-center">
        <div className="relative flex items-center">
          <label className="text-gray-700 text-xs mr-2 font-bold">Sort</label>
          <select
            className="border rounded text-gray-700 font-normal text-xs"
            onChange={(e) => handleSort(e)}
          >
            <option>Sort</option>
            {["resolved", "unresolved"].map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <div className="relative flex items-center">
          <label className="text-gray-700 text-xs mr-2 font-bold">Page Size</label>
          <select
            className="border rounded text-gray-700 font-normal text-xs"
            onChange={(e) => handlePageSize(e)}
          >
            {[3, 5, 15, 20, 25, 50].map((num) => (
              <option value={num} key={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5 p-5 space-y-5">
        {report?.data.map((item) => (
          <div key={item._id} className="shadow-lg p-5 bg-slate-100 hover:bg-slate-300 cursor-pointer transition-all duration-300 hover:p-6 sm:text-sm text-xs hover:text-base"
          onClick={() => handleLink(item._id)}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between">

            <div className="gap-3">

            <div className="flex flex-row font-bold flex-wrap">
              UserId:
              <div className="ml-1 text-orange-500 font-medium ">
                {item.userId}
              </div>
            </div>
            <div>
              <div className="flex flex-row font-bold  flex-wrap">
                Detail:
                <div className="ml-1 text-orange-500 font-medium  line-clamp-1">
                  {item.detail}
                </div>
              </div>
          </div>
          </div>

          <div>
            <div className="flex flex-row font-bold  flex-wrap">
              Submit At:
              <div className="ml-1 text-orange-500 font-medium ">
                {item?.submitAt.toLocaleString()}
              </div>
            </div>
            <div>
              <div className="flex flex-row justify-between font-bold  flex-wrap">
                Resolved:
                <div className="ml-1 text-orange-500 font-medium">
                  {item.resolved == 1 ?
                  <div className="text-green-500 bg-green-500 rounded-full p-2 w-4 h-4" />
                  :
                  <div className="text-red-500 bg-red-500 rounded-full p-2 w-4 h-4" />}
                </div>
              </div>
            </div>
          </div> 
          </div>
        </div>
        ))}
      </div>
      <div className="mt-5 mb-4">
        {report?.data && report?.pagination.total > 0 && (
          <Pagination
            page={report?.pagination.page}
            pages={report?.pagination.pages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  </div>
  
  );
};

export default AdminReports;
