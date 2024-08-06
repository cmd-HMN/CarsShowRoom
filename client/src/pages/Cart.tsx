import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import SideBar from "../components/Profile/SideBar";
import { motion } from 'framer-motion';
import Card from "../components/Cart/Cards";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { data: userId } = useQuery("getUserId", apiClient.getUser);
  const navigate = useNavigate()

  const { data: user } = useQuery(
    ["getUserProfile", userId],
    () => apiClient.getUserProfile(userId),
    {
      enabled: !!userId,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <div className="h-screen flex">
      <div className="flex w-full h-screen sticky top-0">
        <SideBar
          optionOne={false}
          optionTwo={false}
          optionThree={true}
          optionFour={false}
          optionFive={false}
          head="Cart"
        />
        <motion.div
         className="flex-grow p-3 overflow-y-auto bg-offWhite"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1 }}>
            <div className="flex flex-col">
            <motion.div
              className="flex flex-col gap-6"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
                 <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                <span className="font-bold text-lg  sm:text-2xl">
                  Welcome! <span className="text-orange-400">{user?.name}</span>
                </span>
                <span className="flex font-bold text-[12px]  sm:text-base">
                  {`Username: ${user?.username}`}
                </span>
              </div>

              <div className="text-orange-500 font-bold text-2xl sm:text-3xl">
                Cart
              </div>
              <div className="flex flex-grow"> 
                {user?.cart && user?.cart.length > 0 ?
                (<Card userProperty={user?.cart}/>) :
                (<div className="flex justify-center items-center">Cart is Empty</div>)
                    }
              </div>
               <div className="relative">
                <div className="text-[12px] absolute bottom-0 left-0 text-orange-500 hover:text-orange-600 cursor-pointer" onClick={() => navigate('/contact-us')}>
                Report any Problem
              </div>
              </div>
            </motion.div>
            </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;
