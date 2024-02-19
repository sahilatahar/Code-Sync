import { io } from "socket.io-client"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const initSocket = () => {
    return io(BACKEND_URL, {
        reconnectionAttempts: 5,
    })
}
