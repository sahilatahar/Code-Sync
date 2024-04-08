import SocketContext from "@/context/SocketContext"
import { useContext } from "react"

function useSocket() {
    return useContext(SocketContext)
}

export default useSocket
