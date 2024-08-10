import AdmSideBar from "../components/Admin/AdmSideBar";
import { motion } from 'framer-motion';
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "../context/LoadingContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as apiClient from '../api-client'
import { useEffect } from "react";

const AdminSignOut = () => {

    const { showToast } = useAppContext();
    const navigate = useNavigate()
    const {setLoading} = useLoadingContext()
    const queryClient = useQueryClient()
    const {data: validate} = useQuery('admvalidateToken', apiClient.admValidateToken)
    
    const {mutate, isLoading: signOutLoading} = useMutation('signOut', apiClient.admSignOut, {
      onSuccess: async () => {
        showToast({
          message: "Signout Successful",
          type: "SUCCESS",
        });
        queryClient.invalidateQueries('admvalidateToken')
        navigate('/');
      },  
      onError: (error: Error) => {
        showToast({
          message: error.message,
          type: "ERROR",
        });
      },
    })

    const signOut = () => {
      mutate()
    }

    useEffect(() => {
      setLoading(signOutLoading)
    }, 
    [signOutLoading, setLoading]
)

    return (
        <div className="w-full h-screen bg-slate-100 flex">
        <div className="flex w-full h-screen sticky top-0">
          <AdmSideBar
            optionOne={true}
            optionTwo={false}
            optionThree={false}
            optionFour={false}
            optionFive={true}
            head="Profile"
          />
          <motion.div
            className="flex-grow p-3 overflow-y-auto bg-offWhite"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="flex flex-col">
              <motion.div
                className="flex flex-col gap-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                  
                <div className="relative">
                  <h1 className="text-xl font-bold text-Dark uppercase sm:text-Dark sm:text-2xl">
                    Sign <span className="text-orange-400">Out</span>
                  </h1>
                  <p className="font-medium text-Dark text-sm sm:text-lg">
                    Are you sure you want to sign out?
                  </p>
                <div className="absolute bottom-0 right-0 translate-y-14">
                  <button
                    className="w-full px-2 py-1 font-bold text-white bg-orange-400 rounded-md hover:bg-red-600 transition-colors duration-300 sm:px-4 sm:py-2"
                    onClick={() => {
                      signOut();
                      
                    }}
                  >
                    Sign Out
                  </button>
                </div>
                </div>
                
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    )
}

export default AdminSignOut