import { useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Rating from "../Rating";
import { Link, useNavigate } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { BiHeart } from "react-icons/bi";
import { CarType } from "../../forms/CarsForm/ManageCarsFrom";
import { IoMdArrowDropleft, IoMdArrowDropright} from "react-icons/io";
import * as apiClient from '../../api-client'
import { useAppContext } from "../../context/AppContext";
import { FaHeart } from "react-icons/fa";
import { useLoadingContext } from "../../context/LoadingContext";

  type Props = {
  api: () => Promise<CarType[]>
  heading: string
  }

interface ErrorWithMessage {
  message: string;
}
interface AddToCartVariable {
  user: string
  carId: string
}
const Prod = ({api, heading}: Props) => {
  const navigate = useNavigate()
  const { data: car, isLoading} = useQuery(
    heading,
    api,
    {}
  );

  const {setLoading} = useLoadingContext()

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentCars, setCurrentCars] = useState<CarType[]>([]);
  const [display, setDisplay] = useState<number>(3)
  const queryClient = useQueryClient()

  const {showToast, isLoggedIn} = useAppContext()

  useEffect(() => {
    const handleDisplay = () => {
     if(window.innerWidth <= 1000){
        setDisplay(1)
      }
      else if(window.innerWidth >= 1280){
        setDisplay(3)
      }
      else{
        setDisplay(2)
      }
    }
    handleDisplay()
    window.addEventListener('resize', handleDisplay)


    return () =>{ window.removeEventListener('resize', handleDisplay);
    }
    
  }, [])
  const { data: userId, isLoading:userLoading} = useQuery("getUserId", apiClient.getUser);

  const {data: user, isLoading: profileLoading} = useQuery(["getUserProfile", userId], () => apiClient.getUserProfile(userId))

  const {mutate: cart, isLoading: cartLoading}= useMutation('addProdToCart',  ({ user, carId }: AddToCartVariable) => apiClient.addToCart(user, carId), {
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
  
  const {mutate: fav ,isLoading: favLoading} = useMutation('addProdToCart',  ({ user, carId }: AddToCartVariable) => apiClient.addToFav(user, carId), {
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
      increaseFav(carId)
    }
      else{
        navigate('/sign-in')
        showToast({
          message: "Please login to continue",
          type: "ERROR",
        });
      }
  }

  const {mutate: increaseFav} = useMutation('IncSold', (id: string) => apiClient.IncFav(id))
  const {mutate: decreaseFav} = useMutation('IncSold', (id: string) => apiClient.DecFav(id))

  const {mutate: removeCart, isLoading: removeCartLoading} = useMutation('removeFromCart', ({user, carId}: AddToCartVariable) => apiClient.removeFromCart(user, carId), {
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
  const {mutate: removeFav, isLoading: removeFavLoading} = useMutation('removeFromFav', ({user, carId}: AddToCartVariable) => apiClient.removeFromFav(user, carId), {
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
    decreaseFav(carId)
  }

  const lengthArray = car?.length || 0;

  useEffect(() => {
    if (car && lengthArray > 0) {
      const carsToShow = 
        Array(display).fill(undefined).map((_, i) => (
          car[(currentIndex + i) % lengthArray]
        ))
      setCurrentCars(carsToShow);
    }
  }, [display, lengthArray, car, currentIndex])
  
  useEffect(() => {
    setLoading(isLoading || cartLoading || favLoading || userLoading || profileLoading || removeCartLoading || removeFavLoading)
  }, [isLoading, setLoading, cartLoading, favLoading, userLoading ,profileLoading, removeCartLoading, removeFavLoading])

  if (!car || car.length === 0) {
    return <p>Unable to connect to database</p>;
  }


  const handleNext = () => {  
    setCurrentIndex((prevIndex) => (prevIndex + display) % lengthArray);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - display + car.length) % lengthArray);
  };


  return (
    <div className="flex flex-col gap-4 justify-center items-center bg-offWhite">
      {heading && <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-extrabold text-center font-cool text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-700 to-Dark py-3">
        {heading}
      </h1>}
      <div className="relative w-full flex flex-row flex-nowrap justify-center items-center px-4">
        <div className="flex justify-center items-center">  
          <button
            onClick={handlePrev}
            className="p-1 bg-orange-400 text-white opacity-20 transition-all duration-300 hover:opacity-100 rounded-full shadow-lg md:p-4 lg:p-3 sm:p-2"
          >
            <IoMdArrowDropleft/>
          </button>
        </div>

        <div
          className={`relative w-full flex flex-col sm:flex-row flex-wrap justify-center items-center px-4 sm:px-0  gap-5 py-5`}
        >
          {currentCars.map((car: CarType) => (
            <div
              key={car?._id}
              className={`w-full max-w-56 max-h-60 sm:max-h-80 sm:max-w-72 p-5 gap-3 bg-white shadow-xl flex flex-col`}
            >
              <div className="flex justify-center items-center overflow-hidden h-44">
                <img
                  src={car?.imageUrls[0]}
                  width={"auto"}
                  className="transition-transform duration-500 hover:scale-105"
                  alt={car?.model}
                />
              </div>
              <p className="font-bold text-sm sm:text-base md:text-lg">{car?.model}</p>
              <p className="text-orange-300 font-bold text-sm sm:text-base md:text-lg">
                <sup>$</sup>
                {`${car?.price}`}
              </p>
              <Rating rating={car?.rating} className="text-[8px] sm:text-xs" />
              <div className="flex flex-row gap-2 items-center mt-1 text-[8px]  sm:text-[12px]">
                <button className="text-gray-600 bg-orange-400 flex flex-row transition-all hover:scale-110" onClick={() => {user?.cart.includes(car._id) ? handleRemoveFromCart(userId, car._id) : handleAddProdToCart(userId ,car?._id)}}>
                    {user?.cart.includes(car._id) ? 
                    <div className="flex flex-row gap-2 justify-center items-center bg-green-400 shadow-md hover:bg-orange-500 text-white p-2">
                    <BsCart color={"Dark"} />
                    <p className="text-white">
                      Added
                    </p> 
                    </div>
                    : 
                    <div className="flex flex-row gap-1 justify-center items-center bg-orange-500 shadow-md hover:bg-green-400 text-white p-1 py-2">
                    <BsCart color={"Dark"} />
                    <p>Add to cart</p>
                    </div>
                    }
                  </button>
                <div className="flex flex-row gap-2 items-center border p-2 transition-all hover:scale-110  sm:px-4">
                  <Link to={`/view-details/${car?._id}`} className="text-gray-600">
                    View Details
                  </Link> 
                </div>
                <div className="flex flex-row  justify-end items-center ml-2 item-center gap-2 transition-all hover:scale-110 text-[12px] sm:text-xl">
                  <button className="text-gray-600" onClick={() =>{ user?.favorite.includes(car._id) ?  handleRemoveFromFav(userId, car._id) : handleAddProdToFav(userId ,car?._id)
                  }}>
                    {user?.favorite?.includes(car._id) ? <FaHeart color="red"/> : <BiHeart /> }
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={handleNext}
            className="p-1 bg-orange-400 text-white opacity-20 transition-all duration-300 hover:opacity-100 rounded-full shadow-lg md:p-4 lg:p-3 sm:p-2"
          >
            <IoMdArrowDropright />
          </button>
        </div>  
      </div>

    </div>
  );
};

export default Prod;
