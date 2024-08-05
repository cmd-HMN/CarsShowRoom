import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useMutation, useQuery } from "react-query";
import { useAppContext } from "../context/AppContext";
import SideBar from "../components/Profile/SideBar";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export type UserModelType = {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Profile = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const { data: userId } = useQuery("getUserId", apiClient.getUser);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleVisibilityC = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const { data: user } = useQuery(
    ["getUserProfile", userId],
    () => apiClient.getUserProfile(userId),
    {
      enabled: !!userId,
      refetchOnWindowFocus: false,
    }
  );

  const {
    register: registerPassword,
    formState: { errors: passwordErrors },
    handleSubmit: handleSubmitPassword,
    watch: watchPassword,
  } = useForm<UserModelType>();

  const {
    register: registerUsername,
    formState: { errors: usernameErrors },
    handleSubmit: handleSubmitUsername,
  } = useForm<UserModelType>();

  const mutationPassword = useMutation(
    (data: UserModelType) => apiClient.updateUserProfile(userId, data),
    {
      onSuccess: () => {
        showToast({
          message: "Password updated successfully",
          type: "SUCCESS",
        });
        window.location.reload()
      },
      onError: () => {
        showToast({
          message: "Password update failed",
          type: "ERROR",
        });
      },
    }
  );

  const mutationUsername = useMutation(
    (data: UserModelType) => apiClient.updateUserProfile(userId, data),
    {
      onSuccess: () => {
        showToast({
          message: "Username updated successfully",
          type: "SUCCESS",
        });
        window.location.reload()
      },
      onError: () => {
        showToast({
          message: "Username update failed",
          type: "ERROR",
        });
      },
    }
  );

  const onSubmitPassword = (data: UserModelType) => {
    mutationPassword.mutate(data);
  };

  const onSubmitUsername = (data: UserModelType) => {
    mutationUsername.mutate(data);
  };

  return (
    <div className="w-full h-screen bg-slate-100 flex">
      <div className="flex w-full h-screen sticky top-0">
        <SideBar
          optionOne={true}
          optionTwo={false}
          optionThree={false}
          optionFour={false}
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
                Manage your account
              </h2>

              <div className="flex flex-col gap-3 px-2 sm:px-16">
                <form onSubmit={handleSubmitPassword(onSubmitPassword)}>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="block text-[12px] font-medium text-dark sm:text-sm"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        {...registerPassword("password", {
                          required: "Password is required",
                        })}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 pr-10"
                      />
                      <button
                        type="button"
                        onClick={toggleVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-1"
                      >
                        {showPassword ? (
                          <FaEyeSlash className="text-gray-400" />
                        ) : (
                          <FaEye className="text-gray-400" />
                        )}
                      </button>
                    </div>
                    {passwordErrors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordErrors.password.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-[12px] font-medium text-dark sm:text-sm"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      {...registerPassword("confirmPassword", {
                        validate: (val) => {
                          if (!val) {
                            return "This field is required";
                          } else if (watchPassword("password")) {
                            return (
                              val === watchPassword("password") ||
                              "Passwords do not match"
                            );
                          }
                        },
                      })}
                      className="mt-1 p-1 sm:p-2 w-full border border-gray-300 rounded-md focus:outline-orange-400" />
                      <button
                        type="button"
                        onClick={toggleVisibilityC}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-1"
                      >
                        {showPassword ? (
                          <FaEyeSlash className="text-gray-400" />
                        ) : (
                          <FaEye className="text-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  {passwordErrors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {passwordErrors.confirmPassword.message}
                    </p>
                  )}
                  <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-3/2 bg-orange-500 text-white text-[12px] sm:text-sm py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
                  >
                    Change Password
                  </button>
                  </div>
                </form>

                <form onSubmit={handleSubmitUsername(onSubmitUsername)}>
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="block text-[12px] font-medium text-dark sm:text-sm"
                    >
                      Username
                    </label>
                    <input
                      id="text"
                      type="text"
                      {...registerUsername("username", {
                        required: "Username is required",
                      })}
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 pr-10"
                    />
                    {usernameErrors.username && (
                      <p className="text-red-500 text-sm mt-1">
                        {usernameErrors.username.message}
                      </p>
                    )}
                  </div>
                  <div className="flex justify-end">
                  <button
                    type="submit"
                    className="w-3/2 bg-orange-500 text-white text-[12px] sm:text-sm  py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
                  >
                    Change Username
                  </button>
                  </div>
                </form>
              </div>

              <div className="text-[12px] text-orange-500 hover:text-orange-600 cursor-pointer" onClick={() => navigate('/contact-us')}>
                Report any Problem
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
