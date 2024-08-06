import { Link, useNavigate } from "react-router-dom";
import { CarType } from "../../forms/CarsForm/ManageCarsFrom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAppContext } from "../../context/AppContext";
import * as apiClient from "../../api-client";
import Rating from "../Rating";
import { BsCart } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";

type Props = {
  carArray: CarType[] | undefined;
  total: number | undefined;
};

interface ErrorWithMessage {
  message: string;
}
interface AddToCartVariable {
  user: string;
  carId: string;
}
const ShopCard = ({ carArray, total }: Props) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { showToast, isLoggedIn } = useAppContext();
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
          message: "Product added to cart",
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

  const { mutate: increaseFav } = useMutation("IncSold", (id: string) =>
    apiClient.ChangeFav(id)
  );

  const handleFav = (Id: string) => {
    increaseFav(Id);
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
  const { mutate: removeFav } = useMutation(
    "removeFromFav",
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

  if(carArray?.length == 0){
    return <div className="text-center">No product found</div>
  }
  const handleRemoveFromFav = (userID: string, carId: string) => {
    removeFav({ user: userID, carId });
  };

  return (
    <div
      className={`relative w-full flex flex-col sm:flex-row flex-wrap justify-center items-center px-4 sm:px-0  gap-5 py-5`}
    >
      <div className="absolute top-0 text-xs invisible sm:visible text-white bg-orange-500 p-1 shadow-md cursor-pointer">
        {total} {total==1 ? 'Car' : 'Cars'} Found
      </div>
      {carArray?.map((car: CarType) => (
        <div
          key={car?._id}
          className={`w-full max-w-56 max-h-72 sm:max-h-[350px] sm:max-w-72 p-5 gap-3 bg-white shadow-xl flex flex-col`}
      >
          <div className="flex justify-center items-center overflow-hidden h-44">
            <img
              src={car?.imageUrls[0]}
              width={"auto"}
              className="transition-transform duration-500 hover:scale-105"
              alt={car?.model}
            />
          </div>
          <div className="flex flex-row justify-between">
          <p className="font-bold text-sm sm:text-base md:text-lg">
            {car?.model}
          </p>
          <div
            className="font-bold text-sm cursor-pointer p-2"
          >
            {car.available ?
            <div className="relative group">
            <div className="text-green-500 bg-green-500 rounded-full p-2 w-4 h-4" />
            <p className="absolute top-0 left-full ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white px-2 py-1 rounded whitespace-nowrap hover:z-50 z-50">
              In Stock
            </p>
          </div>
             : 
             <div className="relative group">
            <div className="text-red-500 bg-red-500 rounded-full p-2 w-4 h-4" />
            <p className="absolute top-0 left-full ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white px-2 py-1 rounded whitespace-nowrap hover:z-50 z-50">
              Not In Stock
            </p>
          </div>}
          </div>
          </div>
          <p className="text-orange-300 font-bold text-sm sm:text-base md:text-lg">
            <sup>$</sup>
            {`${car?.price}`}
          </p>
          <Rating rating={car?.rating} className="text-[8px] sm:text-xs" />
          <div className="flex flex-row gap-2 items-center mt-1 text-[8px]  sm:text-[12px]">
            <button
              className="text-gray-600 bg-orange-400 flex flex-row transition-all hover:scale-110"
              onClick={() => {
                user?.cart.includes(car._id)
                  ? handleRemoveFromCart(userId, car._id)
                  : handleAddProdToCart(userId, car?._id);
              }}
            >
              {user?.cart.includes(car._id) ? (
                <div className="flex flex-row gap-2 justify-center items-center bg-green-400 shadow-md hover:bg-orange-500 text-white p-2">
                  <BsCart color={"Dark"} />
                  <p className="text-white">Added</p>
                </div>
              ) : (
                <div className="flex flex-row gap-1 justify-center items-center bg-orange-500 shadow-md hover:bg-green-400 text-white p-1 py-2">
                  <BsCart color={"Dark"} />
                  <p>Add to cart</p>
                </div>
              )}
            </button>
            <div className="flex flex-row gap-2 items-center border p-2 transition-all hover:scale-110  sm:px-4">
              <Link to={`/gallery/${car?._id}`} className="text-gray-600">
                View Details
              </Link>
            </div>
            <div className="flex flex-row  justify-end items-center ml-2 item-center gap-2 transition-all hover:scale-110 text-[12px] sm:text-xl">
              <button
                className="text-gray-600"
                onClick={() => {
                  user?.favorite.includes(car._id)
                    ? handleRemoveFromFav(userId, car._id)
                    : handleAddProdToFav(userId, car?._id);
                  {
                    !user?.favorite.includes(car._id) && handleFav(car._id);
                  }
                }}
              >
                {user?.favorite?.includes(car._id) ? (
                  <FaHeart color="red" />
                ) : (
                  <BiHeart />
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopCard;
