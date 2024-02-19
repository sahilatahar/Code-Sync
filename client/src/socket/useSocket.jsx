import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { initSocket } from "./socket"
import ACTIONS from "../utils/actions"
import { toast } from "react-hot-toast"
import AppContext from "../context/AppContext"
import socketStatus from "../utils/socketStatus"

function useSocket() {
    const location = useLocation()
    const navigate = useNavigate()

    const { socket, setSocket, setClients, username, setUsername, setRoomId } =
        useContext(AppContext)
    const [status, setStatus] = useState(socketStatus.CONNECTING)
    const { roomId } = useParams()

    useEffect(() => {
        // if the client is not coming from the home page
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
            setStatus(socketStatus.FAILED)
        }

        function init() {
            setStatus(socketStatus.CONNECTING)

            if (socket == null) {
                const s = initSocket()
                setSocket(s)
            }

            if (socket == null) return

            socket.on("connect", () => setStatus(socketStatus.CONNECTED))
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

    return { status }
}

export default useSocket
