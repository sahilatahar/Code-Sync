import logo from "@/assets/logo.svg"
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

    const {setUserInfo} = useAppContext();

    const [user, setUser] = useState({
        username: "",
        password: ""
    });

    const validateForm = () => {
        if (user.username.trim().length === 0) {
            toast.error("Enter your username");
        }
        if (user.password.trim().length === 0) {
            toast.error("Enter your password");
        }
        return user.username.trim().length > 0 &&
               user.password.trim().length > 0;
    }

    const submitLogin = async (e: React.FormEvent<HTMLFormElement>, user: {username: string, password: string}) => {
        e.preventDefault();
        validateForm();

        try {
            const res = await axios.post(BACKEND_URL + "/api/users/login", user)

            if(res.status === 201) {
                toast.success("Login successful"); 
                setUserInfo({username: user.username, token: res.data.token, email: res.data.email});
                localStorage.setItem("userInfo", JSON.stringify({username: user.username, token: res.data.token, email: res.data.email}));
                navigate("/profile");
            } 
        } catch (error: unknown) {
            if(error instanceof axios.AxiosError && error.response && error.response.status === 400) {
                const errorData = error.response.data as { message: string };
                toast.error(errorData.message);
            } else {
                toast.error("Login failed. Please try again.");
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
                submitLogin(e, user);
            }}
        >
            <h2 className="mb-4 text-2xl font-bold">Login</h2>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3 focus:outline-none"
            />
            <input
                type="password"  
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3 focus:outline-none"
            />
            <button
                type="submit"
                className="mt-2 w-full rounded-md bg-primary px-8 py-3 text-lg font-semibold text-black"
            >
                Login
            </button>
        </form>
        <div className="mt-4">
            <a href="/register" className="text-sm text-gray-500 hover:underline">
                Don't have an account? Register here.
            </a>
        </div>
    </div>
  )
}

export default Login