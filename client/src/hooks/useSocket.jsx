import { initSocket } from "@/socket/socket"
import ACTIONS from "@/utils/actions"
import socketStatus from "@/utils/socketStatus"
import { useEffect } from "react"
import { toast } from "react-hot-toast"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import useAppContext from "./useAppContext"

function useSocket() {
    const location = useLocation()
    const navigate = useNavigate()
    const {
        socket,
        setSocket,
        setClients,
        username,
        setUsername,
        setRoomId,
        setStatus,
    } = useAppContext()
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
            if (socket == null) {
                setStatus(socketStatus.CONNECTING)
                const s = initSocket()
                setSocket(s)
                return
            }

            // socket.on("connect", () => setStatus(socketStatus.CONNECTED))
            socket.on("connect_error", handleErrs)
            socket.on("connect_failed", handleErrs)

            socket.emit(ACTIONS.JOIN, {
                roomId,
                username,
            })

            // This event is emitted by the server when a client successfully joins the room
            socket.on(ACTIONS.JOIN_SUCCESS, () => {
                setStatus(socketStatus.CONNECTED)
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
            socket.off(ACTIONS.JOIN_SUCCESS)
            socket.off(ACTIONS.DISCONNECTED)
            socket.off(ACTIONS.UPDATE_CLIENTS_LIST)
        }
    }, [socket, setSocket, navigate, roomId, setClients, username, setStatus])
}

export default useSocket
