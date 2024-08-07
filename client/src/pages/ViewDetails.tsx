import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { CarType } from "../forms/CarsForm/ManageCarsFrom";
import { TbEngine } from "react-icons/tb";
import { IoCarOutline } from "react-icons/io5";
import { LuFuel } from "react-icons/lu";
import {
  IoMdArrowDropleft,
  IoMdArrowDropright,
  IoMdSpeedometer,
} from "react-icons/io";
import Rating from "../components/Rating";
import { useState } from "react";
import { specificationArray } from "../config/cars-option-config";
import { CarsType } from "../../../server/src/models/cars.model";
import { useAppContext } from "../context/AppContext";
import { BsCart, BsHeart } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";

interface ErrorWithMessage {
  message: string;
}
interface AddToCartVariable {
  user: string;
  carId: string;
}
const ViewDetails = () => {
  const { carId } = useParams();
  const [url, setUrl] = useState(0);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast, isLoggedIn } = useAppContext();

  const Id = carId || "66b27b015f6482d6b4417d8b";
  const { data: car } = useQuery<CarType>(["getCarById", Id], () =>
    apiClient.fetchCarById(Id)
  );

  const handleNext = () => {
    const length = car?.imageUrls.length || 0;
    if (url === length - 1) {
      setUrl(0);
    } else {
      setUrl(url + 1);
    }
  };

  const handlePrev = () => {
    const length = car?.imageUrls.length || 0;
    if (url === 0) {
      setUrl(length - 1);
    } else {
      setUrl(url - 1);
    }
  };
  const { data: userId } = useQuery("getUserId", apiClient.getUser);

  const { data: user } = useQuery(["getUserProfile", userId], () =>
    apiClient.getUserProfile(userId)
  );
  const { mutate: cart } = useMutation(
    "addProdToCart",
    ({ user, carId }: AddToCartVariable) => apiClient.addToCart(user, carId),
    {
      onSuccess: () => {
        showToast({
          message: "Product added to favorite",
          type: "SUCCESS",
        });
        queryClient.invalidateQueries("getUserProfile");
      },
      onError: (err: unknown) => {
        const error = err as ErrorWithMessage;
        showToast({
          message: error.message,
          type: "ERROR",
        });
      },
    }
  );
  const handleAddProdToCart = (user: string, carId: string) => {
    if (isLoggedIn) {
      cart({ user, carId });
    } else {
      navigate("/sign-in");
      showToast({
        message: "Please login to continue",
        type: "ERROR",
      });
    }
  };
  const { mutate: removeCart } = useMutation(
    "removeFromCart",
    ({ user, carId }: AddToCartVariable) =>
      apiClient.removeFromCart(user, carId),
    {
      onSuccess: () => {
        showToast({
          message: "Product removed from cart",
          type: "SUCCESS",
        });
        queryClient.invalidateQueries("getUserProfile");
      },
      onError: (err: unknown) => {
        const error = err as ErrorWithMessage;
        showToast({
          message: error.message,
          type: "ERROR",
        });
      },
    }
  );

  const handleRemoveFromCart = (userID: string, carId: string) => {
    removeCart({ user: userID, carId });
  };
  const { mutate: fav } = useMutation(
    "addProdToCart",
    ({ user, carId }: AddToCartVariable) => apiClient.addToFav(user, carId),
    {
      onSuccess: () => {
        showToast({
          message: "Product added to favorite",
          type: "SUCCESS",
        });
        queryClient.invalidateQueries("getUserProfile");
      },
      onError: (err: unknown) => {
        const error = err as ErrorWithMessage;
        showToast({
          message: error.message,
          type: "ERROR",
        });
      },
    }
  );
  const handleAddProdToFav = (user: string, carId: string) => {
    if (isLoggedIn) {
      fav({ user, carId });
    } else {
      navigate("/sign-in");
      showToast({
        message: "Please login to continue",
        type: "ERROR",
      });
    }
  };
  const { mutate: removeFav } = useMutation(
    "removeFromCart",
    ({ user, carId }: AddToCartVariable) =>
      apiClient.removeFromFav(user, carId),
    {
      onSuccess: () => {
        showToast({
          message: "Product removed from cart",
          type: "SUCCESS",
        });
        queryClient.invalidateQueries("getUserProfile");
      },
      onError: (err: unknown) => {
        const error = err as ErrorWithMessage;
        showToast({
          message: error.message,
          type: "ERROR",
        });
      },
    }
  );

  const handleRemoveFromFav = (userID: string, carId: string) => {
    removeFav({ user: userID, carId });
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex justify-center items-center sm:text-3xl text-xl text-orange-500 font-extrabold">
        {car?.model}
      </div>
      <hr className="border-2 text-gray-500 mt-4 shadow-stone-600 shadow-md" />
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-x-4 sm:space-y-0">
        <div className="relative w-full sm:w-1/2">
          <div className="flex justify-center items-center">
            <div className="relative">
              <button
                onClick={() => handlePrev()}
                className="absolute top-1/2 left-0 sm:-left-11 p-1 bg-orange-400 text-white opacity-20 transition-all duration-300 hover:opacity-100 rounded-full shadow-lg md:p-4 lg:p-3 sm:p-2"
              >
                <IoMdArrowDropleft />
              </button>
              <img
                src={car?.imageUrls[url]}
                alt="car"
                className="w-full max-w-[60vh] sm:max-w-[60vh] object-cover"
              />
              <button
                onClick={() => handleNext()}
                className="absolute top-1/2 right-0  sm:-right-11 p-1 bg-orange-400 text-white opacity-20 transition-all duration-300 hover:opacity-100 rounded-full shadow-lg md:p-4 lg:p-3 sm:p-2"
              >
                <IoMdArrowDropright />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white flex flex-col justify-center border-l-2 shadow-stone-600 shadow-md items-center w-full sm:w-1/2 space-y-4 p-6">
          <div className="flex flex-col w-full space-y-2">
            <div className="flex flex-row justify-start items-center w-full">
              <p className="text-lg sm:text-2xl text-orange-500 font-bold">
                ${car?.price}
              </p>
            </div>
            <div className="flex flex-row justify-start items-center w-full">
              <Rating rating={car?.rating} className="text-sm" />
            </div>
          </div>
          <div className="text-black bg-slate-300 p-2 font-semibold rounded-md flex flex-row justify-center items-center gap-3 w-full hover:bg-slate-400 cursor-pointer">
            <TbEngine />
            <div className="flex flex-col">{car?.engineType}</div>
          </div>
          <div className="text-black bg-slate-300 p-2 font-semibold rounded-md flex flex-row justify-center items-center gap-3 w-full hover:bg-slate-400 cursor-pointer">
            <IoCarOutline />
            <div className="flex flex-col">{car?.mileageCity}</div>
          </div>
          <div className="text-black bg-slate-300 p-2 font-semibold rounded-md flex flex-row justify-center items-center gap-3 w-full sm:flex hover:bg-slate-400 cursor-pointer">
            <LuFuel />
            <div className="flex flex-col">{car?.fuelTankCapacity}</div>
          </div>
          <div className="text-black bg-slate-300 p-2 font-semibold rounded-md flex flex-row justify-center items-center gap-3 w-full sm:flex hover:bg-slate-400 cursor-pointer">
            <IoMdSpeedometer />
            <div className="flex flex-col">{car?.horsePower}</div>
          </div>
        </div>
      </div>
      <hr className="border-2 text-gray-500 shadow-stone-600 shadow-md" />
      <div className="flex justify-between text-orange-500 px-8 pt-6">
        <button
          className="text-gray-600 sm:text-lg  text-xs transition-all hover:scale-110"
          onClick={() => {
            user?.cart.includes(car?._id ?? "")
              ? handleRemoveFromCart(userId, car?._id ?? "")
              : handleAddProdToCart(userId, car?._id ?? "");
          }}
        >
          {user?.cart.includes(car?._id ?? "") ? (
            <div className="flex flex-row gap-2 justify-center rounded-md items-center bg-green-400 shadow-md hover:bg-orange-500 text-white p-2">
              <BsCart color={"Dark"} />
              <p className="text-white">Added</p>
            </div>
          ) : (
            <div className="flex flex-row gap-1 justify-center rounded-md items-center bg-orange-500 shadow-md hover:bg-green-400 text-white p-1 py-2">
              <BsCart color={""} />
              <p>Add to Cart</p>
            </div>
          )}
        </button>
        <button
          className="text-Dark sm:text-lg  text-xs rounded-md  border border-gray-400 transition-all hover:scale-110"
          onClick={() => {
            user?.favorite.includes(car?._id ?? "")
              ? handleRemoveFromFav(userId, car?._id ?? "")
              : handleAddProdToFav(userId, car?._id ?? "");
          }}
        >
          {user?.favorite.includes(car?._id ?? "") ? (
            <div className="flex flex-row gap-2 justify-center items-center shadow-md p-2">
              <FaHeart color={"red"} />
              <p className="text-gray-400">Added</p>
            </div>
          ) : (
            <div className="flex flex-row gap-1 justify-center items-center rounded-md shadow-md text-gray-400 p-1 py-2">
              <BsHeart color={"Dark"} />
              <p>Add to Fav</p>
            </div>
          )}
        </button>
        {/*ToDo 
                  payment button */}
      </div>
      <div className="bg-white flex flex-col justify-center items-center w-full sm:p-4">
        <div className="ql-snow">
          {car?.description && (
            <div
              className="ql-editor"
              dangerouslySetInnerHTML={{ __html: car?.description }}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col p-2 sm:p-8">
        <div className="flex justify-center sm:justify-start font-bold sm:text-2xl text-xl mb-2">
          Specification
        </div>
        <div className="bg-gray-100 p-8 flex flex-col justify-between sm:grid sm:grid-cols-2 gap-4 text-sm">
          {specificationArray.map((item: keyof CarsType) => (
            <div
              key={item}
              className="flex flex-row justify-between text-xs transition-all duration-300 hover:bg-gray-300 hover:p-2 hover:text-sm cursor-pointer rounded-md"
            >
              <p className="font-bold  uppercase">{item}</p>
              {typeof car?.[item] === "object" && car?.[item] instanceof Date
                ? car[item].toLocaleDateString()
                : car?.[item]?.toString()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
