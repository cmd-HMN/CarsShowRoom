import { useQueries } from "react-query";
import * as apiClient from "../../api-client";
import Rating from "../Rating";
import { TbEngine } from "react-icons/tb";
import { IoCarOutline } from "react-icons/io5";
import { LuFuel } from "react-icons/lu";
import { IoMdSpeedometer } from "react-icons/io";

type Props = {
  userProperty: string[];
};

const Card = ({ userProperty }: Props) => {
  const queries =
    userProperty.map((carId) => ({
      queryKey: ["fetchCarById", carId],
      queryFn: () => apiClient.fetchCarById(carId),
    })) || [];

  const results = useQueries(queries);

  return (
    <div>
      {results.map((result, index) => {
        const { data } = result;
        if (!data) {
          return <div key={index}>Car not found</div>;
        }

        return (
          <div key={index} className="flex flex-col flex-grow ">
            <div className="flex flex-col h-auto w-full shadow-lg bg-offWhite sm:grid sm:grid-cols-[1fr_1fr_1fr_1fr]  p-4 sm:gap-4 sm:justify-between">
              <div className="flex justify-center items-center">
                <img
                  src={data?.imageUrls[0]}
                  width={"auto"}
                  className="transition-transform duration-500 hover:scale-105 max-w-full max-h-44 sm:max-w-[150px] sm:max-h-[150px] object-cover"
                  alt={data?.model}
                />
              </div>
              <div>
                <div className="flex flex-col">
                  <div className="text-lg font-bold sm:text-xl">
                    {data?.model}
                  </div>
                  <div className="line-clamp-3 leading-tight mb-4 sm:mb-0 text-sm sm:max-w-xs">
                    {/* <div className="ql-snow">
                  <div
                    className="ql-editor"
                    dangerouslySetInnerHTML={{ __html:   data.description }}
                  />
                  </div> */}
                    <div
                      dangerouslySetInnerHTML={{ __html: data?.description }}
                    />
                  </div>
                  <div className="text-orange-300 text-lg font-bold sm:text-xl">
                    ${data?.price}
                  </div>
                </div>
                <Rating rating={data?.rating} className="text-sm sm:text-lg" />
              </div>

              <div className="grid grid-cols-2 sm:flex sm:flex-col gap-2 py-4">
                <div className="text-black bg-slate-300 p-1  font-semibold rounded-md flex flex-row justify-center items-center gap-3">
                  <TbEngine />
                  <div className="flex flex-col">{data?.engineType}</div>
                </div>
                <div className="text-black bg-slate-300 p-1  font-semibold rounded-md flex flex-row justify-center items-center gap-3">
                  <IoCarOutline />
                  <div className="flex flex-col">{data?.mileageCity}</div>
                </div>
                <div className="text-black bg-slate-300 p-1  font-semibold rounded-md flex-row justify-center items-center gap-3 hidden sm:flex">
                  <LuFuel />
                  <div className="flex flex-col">{data?.fuelTankCapacity}</div>
                </div>
                <div className="text-black bg-slate-300 p-1  font-semibold rounded-md flex-row justify-center items-center gap-3 hidden sm:flex">
                  <IoMdSpeedometer />
                  <div className="flex flex-col">{data?.horsePower}</div>
                </div>
              </div>

              <div className="flex justify-center items-center relative pt-6 sm:pt-0 ">
                <button className="absolute bottom-0 right-0 bg-orange-400 p-1 text-white text-sm  opacity-20 transition-all duration-300 hover:opacity-100 shadow-md md:p-4 lg:p-3">
                  View Details
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
