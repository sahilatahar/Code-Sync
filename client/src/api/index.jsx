import axios from "axios"

const pistonBaseUrl = "https://emkc.org/api/v2/piston"

const instance = axios.create({
    baseURL: pistonBaseUrl,
    headers: {
        "Content-Type": "application/json",
    },
})

export default instance
