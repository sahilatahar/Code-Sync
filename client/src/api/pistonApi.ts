import axios, { AxiosInstance } from "axios"

const pistonBaseUrl = import.meta.env.VITE_PISTON_API_URL || "http://localhost:2000/api/v2"

const instance: AxiosInstance = axios.create({
    baseURL: pistonBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
})

export default instance
