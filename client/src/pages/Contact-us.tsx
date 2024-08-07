import { useForm } from "react-hook-form"
import { useMutation, useQuery } from "react-query"
import * as apiClient from '../api-client'
import { useAppContext } from "../context/AppContext"
import { motion } from 'framer-motion';
import SideBar from "../components/Profile/SideBar";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {

    const navigate = useNavigate()
    const {register, formState:{errors}, handleSubmit} = useForm<apiClient.ReportForm>()
    const {showToast} = useAppContext()
    const { data: userId } = useQuery("getUserId", apiClient.getUser);
    const { data: user } = useQuery(
        ["getUserProfile", userId],
        () => apiClient.getUserProfile(userId),
        {
          enabled: !!userId,
          refetchOnWindowFocus: false,
        }
      );
    const mutation = useMutation('ReportProblem', apiClient.ReportProblem, {
        onSuccess: () => {
            showToast({
                message: "Thank you for your feedback!",
                type: "SUCCESS"
            })
            navigate('/profile')
        },
        onError: () => {
            showToast({
                message: "Something went wrong",
                type: "ERROR"
            })
        }
    })

    const handleReport = (data: apiClient.ReportForm) => {
        mutation.mutate(data)
    }
    return (
        <div className="w-full h-screen bg-slate-100 flex">
        <div className="flex w-full h-screen sticky top-0">
          <SideBar
            optionOne={false}
            optionTwo={false}
            optionThree={false}
            optionFour={true}
            optionFive={false}
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
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                  <span className="font-bold text-lg  sm:text-2xl">
                    Welcome! <span className="text-orange-400">{user?.name}</span>
                  </span>
                  <span className="flex font-bold text-[12px]  sm:text-base">
                    {`Username: ${user?.username}`}
                  </span>
                </div>
                <p>
                  This page will preview all the desireable content for the user.
                </p>
                <h2 className="text-lg font-bold text-orange-500 sm:text-2xl">
                  Report a problem
                </h2>
                <form onSubmit={handleSubmit(handleReport)}>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      UserID
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                      id="userID"
                      type="text"
                      placeholder="UserId"
                      value={userId || ''}    
                      readOnly
                      {...register("userId", { required: true })}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                        Description
                    </label>
                    <textarea
                      className="shadow appearance-none border rounded w-full py-2 px-3 h-60 leading-tight focus:outline-none focus:shadow-outline"
                      id="userID"
                      {...register("detail", { required: "This is required" })}
                    />
                    {errors.detail && (
                      <div className="text-red-500">{errors.detail.message}</div>
                    )}
                  </div>
                  <div className="flex justify-end">
                    <button className="text-white bg-orange-500 py-2 shadow-md px-2 rounded-md hover:bg-orange-600">
                       Report
                    </button>
                  </div>
                </form>
                
                </motion.div>

                </div>
                </motion.div>
                </div>
                </div>

    )

}

export default ContactUs