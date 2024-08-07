import { useMutation, useQueries, useQueryClient } from "react-query";
import * as apiClient from "../../api-client";
import Rating from "../Rating";
import { TbEngine } from "react-icons/tb";
import { IoCarOutline } from "react-icons/io5";
import { LuFuel } from "react-icons/lu";
import { IoMdSpeedometer } from "react-icons/io";
import { useAppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";

type Props = {
  userProperty: string[];
  userId: string
  fav: boolean
};
type CartVariable  = {
  user: string,
  carId: string
}
interface ErrorWithMessage {
  message: string;
}

const Card = ({ userProperty, userId, fav }: Props) => {
  const queries =
  userProperty.map((carId) => ({
      queryKey: ["fetchCarById", carId],
      queryFn: () => apiClient.fetchCarById(carId),
    })) || [];
    
  const {showToast} = useAppContext()
  const results = useQueries(queries);
  const queryClient = useQueryClient()
  const {mutate: removeCart} = useMutation('removeFromCart', ({user, carId}: CartVariable) => apiClient.removeFromCart(user, carId), {
    onSuccess: () => {
      showToast({
        message: "Product removed from cart",
        type: "SUCCESS",
      });
      queryClient.invalidateQueries('getUserProfile')
    },
    onError: (err: unknown) => {
      const error = err as ErrorWithMessage;
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  })

  const handleRemoveFromCart = (userID: string, carId: string) => {
    removeCart({user: userID, carId})
  }
  const {mutate: removeFav} = useMutation('removeFromCart', ({user, carId}: CartVariable) => apiClient.removeFromFav(user, carId), {
    onSuccess: () => {
      showToast({
        message: "Product removed from cart",
        type: "SUCCESS",
      });
      queryClient.invalidateQueries('getUserProfile')
    },
    onError: (err: unknown) => {
      const error = err as ErrorWithMessage;
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  })

  const handleRemoveFromFav = (userID: string, carId: string) => {
    removeFav({user: userID, carId})
  }
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
                <div className="">
                <button className="absolute top-0 left-0 sm:left-auto sm:right-0 bg-orange-400 p-1 text-white text-sm transition-all duration-300 hover:bg-red-600 rounded-lg shadow-md md:p-4 lg:p-3" onClick={() => {fav ? handleRemoveFromFav(userId, data._id) : handleRemoveFromCart(userId, data._id)}}>
                  Remove
                </button>
                </div>
                <div className="absolute bottom-0 right-0 bg-orange-400 p-1 text-white text-sm transition-all duration-300 hover:bg-green-400 rounded-lg  shadow-md md:p-4 lg:p-3">
                  <Link to={`/view-details/${data?._id}`}>
                    View Details
                  </Link> 
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
