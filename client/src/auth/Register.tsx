import logo from "@/assets/logo.svg"
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import {  useNavigate } from "react-router-dom";


function Register() {
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const validateForm = () => {
        if (user.username.trim().length === 0) {
            toast.error("Enter your username");
        }
        if (user.email.trim().length === 0) {
            toast.error("Enter your email");
        }
        if (user.password.trim().length === 0) {
            toast.error("Enter your password");
        }
        if (user.password.trim().length < 6) {
            toast.error("Password must be at least 6 characters long");
        }
        return user.username.trim().length > 0 &&
               user.email.trim().length > 0 &&
               user.password.trim().length >= 6;
    }

    const submitRegisteration = async (e: React.FormEvent<HTMLFormElement>, user: {username: string, email: string, password: string}) => {
        e.preventDefault();
        validateForm();

        try {
            const res = await axios.post(BACKEND_URL + "/api/users/register", user)

            if(res.status === 201) {
                toast.success("Registration successful"); 
                navigate("/login");
            }
        } catch (error: unknown) {
            if(error instanceof AxiosError && error.response && error.response.status === 400) {
                const errorData = error.response.data as { message: string };
                toast.error(errorData.message);
            } else {
                toast.error("Registration failed. Please try again.");
            }
        }
    }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
        <div className="flex w-full justify-center sm:w-1/2 max-w-[500px] sm:pl-4">
            <img src={logo} alt="Logo" className="w-full"/>
        </div>
        <form className="flex w-full max-w-[500px] flex-col items-center justify-center gap-4 p-4 sm:w-[500px] sm:p-8"
            onSubmit={(e) => {
                submitRegisteration(e, user);
            }}
        >
            <h2 className="mb-4 text-2xl font-bold">Register</h2>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3 focus:outline-none"
            />
            <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3 focus:outline-none"
            />
            <div className="w-full relative">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3 focus:outline-none"
                />
                {
                    showPassword ?
                    <IoEyeOff 
                        className="absolute right-3 top-4 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    /> :
                    <IoEye 
                        className="absolute right-3 top-4 cursor-pointer text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                    />
                }
            </div>
            <button
                type="submit"
                className="mt-2 w-full rounded-md bg-primary px-8 py-3 text-lg font-semibold text-black"
            >
                Register
            </button>
        </form>
        <div className="mt-4">
            <a href="/login" className="text-sm text-gray-500 hover:underline">
                Already have an account? Login here.
            </a>
        </div>
    </div>
  )
}

export default Register