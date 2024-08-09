import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from '../api-client';
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
export type SignInDataType = {
    email: string;
    password: string;
}

const AdminSignIn = () => {
    
    const navigate = useNavigate();
    const { showToast } = useAppContext();
    const { register, handleSubmit, formState: { errors } } = useForm<SignInDataType>();
    const mutation = useMutation(apiClient.admSignIn, {
        onSuccess: async () => {
            showToast({
                message: "Signin Successful",
                type: "SUCCESS"
            });
            navigate("/admin/profile");
        },
        onError: (error: Error) => {
            showToast({
                message: error.message,
                type: "ERROR"
            });
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });


    return (
        <form className="p-32" onSubmit={onSubmit}>
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    id="password"
                    type="password"
                    {...register("password", { required: "Password is required" })}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                />
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
        <div className="flex flex-row justify-between space-x-16">
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
                Sign In
            </button>
            <div>
        
            </div>
            <div className="text-xs">
            <p className="text-center text-gray-500">Forgot password? <a href="/reset-password" className="text-blue-500 hover:text-blue-600">Reset Password</a></p>
            </div>
        </div>
        </form>
    );
}

export default AdminSignIn;
