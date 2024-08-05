import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export type SignUpDataType = {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
};

const SignUp = () => {
  const navigate = useNavigate();
  const { showToast } = useAppContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpDataType>();
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showPasswordC, setShowPasswordC] = useState(false);

  const toggleVisibilityC = () => {
    setShowPasswordC(!showPasswordC);
  };
  const queryClient = useQueryClient();
  const mutation = useMutation(apiClient.signup, {
    onSuccess: async () => {
      showToast({
        message: "Signup Successful",
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
    <div className="flex h-screen">
      <div className="w-1/2 bg-[url('/src/assets/SU_.jpg')] bg-cover bg-center  hidden sm:block" />
      <div className="w-full sm:w-1/2 flex items-center justify-center bg-[url('/src/assets/SUF.png')] bg-cover bg-no-repeat p-5">
        <form className="w-full p-3 rounded-md shadow-lg" onSubmit={onSubmit}>
          <div className="relative w-full">
            <div className="flex flex-col gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-orange-400 uppercase">
              Sign Up
            </h1>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-orange-400"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                {...register("name", { required: "Name is required" })}
                className="mt-1 p-1 sm:p-2 w-full border border-gray-300 rounded-md focus:outline-orange-400"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-orange-400"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className="mt-1 p-1 sm:p-2 w-full border border-gray-300 rounded-md focus:outline-orange-400"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-orange-500"
              >
                Password
              </label>
              <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be of at least 6 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must include uppercase letters, a number, and a special character 🤓",
                  },
                })}
                className="mt-1 p-1 sm:p-2 w-full border border-gray-300 rounded-md focus:outline-orange-400"
              /> <button
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-orange-400"
              >
                Confirm Password
              </label>
              <div className="relative">
              <input
                id="confirmPassword"
                type={showPasswordC ? "text" : "password"}
                {...register("confirmPassword", {
                  validate: (val) => {
                    if (!val) {
                      return "This field is required";
                    } else if (watch("password")) {
                      return (
                        val === watch("password") || "Passwords do not match"
                      );
                    }
                  },
                })}
                className="mt-1 p-1 sm:p-2 w-full border border-gray-300 rounded-md focus:outline-orange-400"
              />
               <button
                type="button"
                onClick={toggleVisibilityC}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-1"
              >
                {showPasswordC ? (
                  <FaEyeSlash className="text-gray-400" />
                ) : (
                  <FaEye className="text-gray-400" />
                )}
              </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <div className="flex flex-row justify-between space-x-16 mt-2">
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
              >
                Sign Up
              </button>
            </div>
            <div className="text-xs pt-3">
              <p className="text-center text-orange-400">
                Already have an account have an account?{" "}
                <a
                  href="/sign-in"
                  className="text-red-700 hover:text-orange-600"
                >
                  Sign In
                </a>
              </p>
            </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
