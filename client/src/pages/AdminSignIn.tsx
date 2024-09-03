import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
export type SignInDataType = {
    email: string;
    password: string;
}

const AdminSignIn = () => {
    
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { register, handleSubmit, formState: { errors } } = useForm<SignInDataType>();
    const {mutate: admSignIn} = useMutation(apiClient.admSignIn, {
        onSuccess: () => {
            showToast({
                message: "Signin Successful",
                type: "SUCCESS"
            });
            navigate('/admin/profile'); 
        },
        onError: (error: Error) => {
            showToast({
                message: error.message,
                type: "ERROR"
            });
        }
    });

    const onSubmit = handleSubmit((data) => {
        admSignIn(data);
        
    });

    return (
        <div className="flex min-h-screen bg-[url('/src/assets/adm.jpg')] bg-cover justify-center items-center">
        <form className="sm:w-1/3 p-5 rounded-md shadow-xl" onSubmit={onSubmit}>
            <h1 className="sm:text-2xl text-lg font-bold mb-4 text-orange-500">Sign In</h1>
            <div className="mb-4">
                <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-orange-500">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="mt-1 p-1 sm:p-2 w-full border border-gray-300 rounded-md"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-orange-500">Password</label>
                <div className="relative">
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: "Password is required" })}
                    className="mt-1 p-1 sm:p-2 w-full border border-gray-300 rounded-md"
                />
                <button
                    type="button"
                    className="absolute top-1/2 right-2 transform -translate-y-1/2"
                    onClick={toggleVisibility}
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
            </div>
        <div className="flex flex-row flex-wrap justify-between space-x-16">
            <button
                type="submit"
                className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-200"
            >
                Sign In
            </button>
        </div>
        </form>
        </div>
    );
}

export default AdminSignIn;
