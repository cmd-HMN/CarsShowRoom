import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export type SignInDataType = {
  email: string;
  password: string;
};

const SignIn = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInDataType>();
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.signin, {
    onSuccess: async () => {
      showToast({
        message: "Signin Successful",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validateToken");
      navigate("/profile");
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex flex-col sm:flex-row h-screen">
      <div className="w-full sm:w-1/2 flex items-center justify-center bg-[url('/src/assets/SIF.png')] bg-cover bg-no-repeat shadow-2xl py-16">
        <form
          className="p-5 rounded-md shadow-lg w-full max-w-80"
          onSubmit={onSubmit}
        >
          <h1 className="text-3xl font-bold mb-4 text-Dark uppercase sm:text-orange-400">
            Sign <span className="text-orange-400">In</span>
          </h1>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-orange-400 sm:text-Dark lg:text-orange-500 md:text-orange-400  xl:text-Dark"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              {...register("email", { required: "Email is required" })}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-dark"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
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
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:space-x-4 mt-6">
            <button
              type="submit"
              className="w-full bg-orange-500 text-white p-3 px-6 rounded-md hover:bg-orange-600 transition duration-200 mb-2 sm:mb-0"
            >
              Sign In
            </button>
          </div>
          <div className="text-xs mt-4">
            <p className="text-center text-orange-400 mb-3">
              Don't have an account?{" "}
              <a
                href="/sign-up"
                className="text-orange-500 hover:text-orange-600"
              >
                Sign Up
              </a>
            </p>
            <p className="text-center text-orange-400">
              Forgot password?{" "}
              <a
                href="/reset-password"
                className="text-orange-500 hover:text-orange-600"
              >
                Reset Password
              </a>
            </p>
          </div>
        </form>
      </div>
      <div className="w-full sm:w-1/2 h-40 sm:h-auto bg-[url('/src/assets/SI_.jpg')] bg-Dark bg-cover bg-no-repeat bg-center sm:bg-[center_20%]" />
    </div>
  );
};

export default SignIn;
