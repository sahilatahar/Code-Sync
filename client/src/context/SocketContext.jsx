import useAppContext from "@/hooks/useAppContext"
import ACTIONS from "@/utils/actions"
import UserStatus from "@/utils/status"
import PropTypes from "prop-types"
import { createContext, useCallback, useEffect, useMemo } from "react"
import { toast } from "react-hot-toast"
import { io } from "socket.io-client"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const SocketContext = createContext()

const SocketProvider = ({ children }) => {
    const { setUsers, setStatus, setCurrentUser } = useAppContext()
    const socket = useMemo(
        () =>
            io(BACKEND_URL, {
                reconnectionAttempts: 2,
            }),
        [],
    )

    const handleError = useCallback(
        (err) => {
            console.log("socket error", err)
            setStatus(UserStatus.FAILED)
            toast.dismiss()
            toast.error("Failed to connect to the server")
        },
        [setStatus],
    )

    const handleJoiningSuccess = useCallback(
        ({ user, users }) => {
            setCurrentUser(user)
            setUsers(users)
            // This event is emitted by the server when a user successfully joins the room
            setStatus(UserStatus.CONNECTED)
        },
        [setCurrentUser, setStatus, setUsers],
    )

    const handleUserLeft = useCallback(
        ({ user }) => {
            toast.success(`${user.username} left the room`)
            setUsers((prev) => {
                return prev.filter((u) => u.username !== user.username)
            })
        },
        [setUsers],
    )

    useEffect(() => {
        socket.on("connect_error", handleError)
        socket.on("connect_failed", handleError)
        socket.on(ACTIONS.JOIN_SUCCESS, handleJoiningSuccess)
        socket.on(ACTIONS.DISCONNECTED, handleUserLeft)

        return () => {
            socket.off("connect_error")
            socket.off("connect_failed")
            socket.off(ACTIONS.JOIN_SUCCESS)
            socket.off(ACTIONS.DISCONNECTED)
        }
    }, [handleError, handleJoiningSuccess, handleUserLeft, setUsers, socket])

    return (
        <SocketContext.Provider
            value={{
                socket,
            }}
        >
            {children}
        </SocketContext.Provider>
    )
}

SocketProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { SocketProvider }
export default SocketContext
