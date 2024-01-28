import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { initSocket } from "../services/socket"
import ACTIONS from "../utils/actions"
import { toast } from "react-hot-toast"
import AppContext from "../context/AppContext"

function useSocket() {
    const location = useLocation()
    const navigate = useNavigate()

    const { socket, setSocket, setClients, username, setUsername, setRoomId } =
        useContext(AppContext)
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const { roomId } = useParams()

    useEffect(() => {
        // if the user is not coming from the home page
        if (!location.state?.username) {
            navigate("/", { state: { roomId } })
        } else {
            // set username to context
            setRoomId(roomId)
            setUsername(location.state.username)
        }
    }, [navigate, roomId, location.state?.username, setUsername, setRoomId])

    useEffect(() => {
        const handleErrs = (err) => {
            console.log("socket error", err)
            console.log("socket connection failed, try again later")
            setIsError(true)
        }

        function init() {
            setIsLoading(true)
            setIsError(false)

            if (socket == null) {
                const s = initSocket()
                setSocket(s)
            }

            if (socket == null) return

            socket.on("connect", () => setIsLoading(false))
            socket.on("connect_error", handleErrs)
            socket.on("connect_failed", handleErrs)

            socket.emit(ACTIONS.JOIN, {
                roomId,
                username,
            })

            socket.on(ACTIONS.UPDATE_CLIENTS_LIST, ({ clients }) => {
                setClients(clients)
            })

            socket.on(ACTIONS.DISCONNECTED, ({ username, socketId }) => {
                toast.success(`${username} left the room`)
                setClients((prev) => {
                    return prev.filter((client) => client.socketId != socketId)
                })
            })
        }

        init()

        return () => {
            if (socket == null) return

            socket.disconnect()
            socket.off("connect")
            socket.off("connect_error")
            socket.off("connect_failed")
            socket.off(ACTIONS.DISCONNECTED)
            socket.off(ACTIONS.UPDATE_CLIENTS_LIST)
        }
    }, [socket, setSocket, navigate, roomId, setClients, username])

    return { isLoading, isError }
}

export default useSocket
