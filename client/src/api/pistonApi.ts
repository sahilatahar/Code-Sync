import config from "@/config"
import axios, { AxiosInstance } from "axios"

const instance: AxiosInstance = axios.create({
    baseURL: config.pistonApiUrl,
    headers: {
        "Content-Type": "application/json",
    },
})

export default instance
