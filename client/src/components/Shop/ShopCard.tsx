import { Link, useNavigate } from "react-router-dom";
import { CarType } from '../../forms/CarsForm/ManageCarsFrom';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAppContext } from "../../context/AppContext";
import * as apiClient from '../../api-client'
import Rating from "../Rating";
import { BsCart } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";


type Props = {
    carArray: CarType[] | undefined

    }
  
  interface ErrorWithMessage {
    message: string;
  }
  interface AddToCartVariable {
    user: string
    carId: string
  }
const ShopCard = ({carArray}: Props) => {
    
    const navigate = useNavigate()
  const queryClient = useQueryClient()

  const {showToast, isLoggedIn} = useAppContext()
  const { data: userId } = useQuery("getUserId", apiClient.getUser);

  const {data: user} = useQuery(["getUserProfile", userId], () => apiClient.getUserProfile(userId))

  const {mutate: cart}= useMutation('addProdToCart',  ({ user, carId }: AddToCartVariable) => apiClient.addToCart(user, carId), {
    onSuccess: () => {
      showToast({
        message: "Product added to cart",
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
  
  const {mutate: fav} = useMutation('addProdToCart',  ({ user, carId }: AddToCartVariable) => apiClient.addToFav(user, carId), {
    onSuccess: () => {
      showToast({
        message: "Product added to favorite",
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
  const handleAddProdToCart = (user: string , carId: string) => {
    if(isLoggedIn){
    cart({user, carId})
    }
    else{
      navigate('/sign-in')
      showToast({
        message: "Please login to continue",
        type: "ERROR",
      });
    }

  }
  const handleAddProdToFav = (user: string , carId: string) => {
    if(isLoggedIn){
      fav({user, carId})
    }
      else{
        navigate('/sign-in')
        showToast({
          message: "Please login to continue",
          type: "ERROR",
        });
      }
  }

  const {mutate: increaseFav} = useMutation('IncSold', (id: string) => apiClient.ChangeFav(id))

  const handleFav = (Id: string) => {
    
    increaseFav(Id)
  }

  const {mutate: removeCart} = useMutation('removeFromCart', ({user, carId}: AddToCartVariable) => apiClient.removeFromCart(user, carId), {
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
  const {mutate: removeFav} = useMutation('removeFromFav', ({user, carId}: AddToCartVariable) => apiClient.removeFromFav(user, carId), {
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
    <div
    className={`relative w-full flex flex-col sm:flex-row flex-wrap justify-center items-center px-4 sm:px-0  gap-5 py-5`}
  >
    {carArray?.map((car: CarType) => (
      <div
        key={car?._id}
        className={`w-full max-w-80 h-auto sm:w-[48%] lg:w-[30%]  p-5 gap-3 bg-white shadow-xl flex flex-col`}
      >
        <div className="relative">
          <div
            className="font-bold text-sm cursor-pointer absolute top-0 p-2"
          >
            {car.available ?
            <div className="relative group">
            <div className="text-green-500 bg-green-500 rounded-full p-2 w-4 h-4" />
            <p className="absolute top-0 left-full ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white px-2 py-1 rounded whitespace-nowrap">
              In Stock
            </p>
          </div>
             : 
             <div className="relative group">
            <div className="text-red-500 bg-red-500 rounded-full p-2 w-4 h-4" />
            <p className="absolute top-0 left-full ml-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white px-2 py-1 rounded whitespace-nowrap">
              Not In Stock
            </p>
          </div>}
          </div>
        </div>
        <div className="flex justify-center items-center overflow-hidden h-52">
          <img
            src={car?.imageUrls[0]}
            width={"auto"}
            className="transition-transform duration-500 hover:scale-105"
            alt={car?.model}
          />
        </div>
        <p className="font-bold text-lg">{car?.model}</p>
        <p className="text-orange-300 font-bold text-2xl">
          <sup>$</sup>
          {`${car?.price}`}
        </p>
        <Rating rating={car?.rating} className="text-sm sm:text-lg" />
        <div className="flex flex-row gap-2 items-center mt-4 text-xs overflow-hidden">
          <div className="flex flex-row gap-2 items-center border p-2 px-4 transition-all hover:scale-110">
            <BsCart color={"Dark"} />
          <button className="text-gray-600" onClick={() => {user?.cart.includes(car._id) ? handleRemoveFromCart(userId, car._id) : handleAddProdToCart(userId ,car?._id)}}>
              {user?.cart.includes(car._id) ? <p className="text-green-500">
                Added
              </p> : <p>Add to cart</p>}
            </button>
          </div>
          <div className="flex flex-row gap-2 items-center border p-2 px-4 transition-all hover:scale-110">
            <Link to={`/gallery/${car?._id}`} className="text-gray-600">
              View Details
            </Link> 
          </div>
          <div className="flex flex-row border p-[10px] item-center gap-2 transition-all hover:scale-110">
            <button className="text-gray-600" onClick={() =>{ user?.favorite.includes(car._id) ?  handleRemoveFromFav(userId, car._id) : handleAddProdToFav(userId ,car?._id); 
              {!user?.favorite.includes(car._id) && handleFav(car._id)}
            }}>
              {user?.favorite?.includes(car._id) ? <FaHeart color="red"/> : <BiHeart /> }
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default ShopCard