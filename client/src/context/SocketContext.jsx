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
    const { setUsers, setStatus, setCurrentUser, drawingData, setDrawingData } =
        useAppContext()
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
            setStatus(UserStatus.CONNECTION_FAILED)
            toast.dismiss()
            toast.error("Failed to connect to the server")
        },
        [setStatus],
    )

    const handleUsernameExist = useCallback(() => {
        toast.dismiss()
        setStatus(UserStatus.INITIAL)
        toast.error(
            "The username you chose already exists in the room. Please choose a different username.",
        )
    }, [setStatus])

    const handleJoiningAccept = useCallback(
        ({ user, users }) => {
            setCurrentUser(user)
            setUsers(users)
            toast.dismiss()
            setStatus(UserStatus.JOINED)
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

    const handleRequestDrawing = useCallback(
        ({ socketId }) => {
            socket.emit(ACTIONS.SYNC_DRAWING, { socketId, drawingData })
        },
        [drawingData, socket],
    )

    const handleDrawingSync = useCallback(
        ({ drawingData }) => {
            setDrawingData(drawingData)
        },
        [setDrawingData],
    )

    useEffect(() => {
        socket.on("connect_error", handleError)
        socket.on("connect_failed", handleError)
        socket.on(ACTIONS.USERNAME_EXISTS, handleUsernameExist)
        socket.on(ACTIONS.JOIN_ACCEPTED, handleJoiningAccept)
        socket.on(ACTIONS.USER_DISCONNECTED, handleUserLeft)
        socket.on(ACTIONS.REQUEST_DRAWING, handleRequestDrawing)
        socket.on(ACTIONS.SYNC_DRAWING, handleDrawingSync)

        return () => {
            socket.off("connect_error")
            socket.off("connect_failed")
            socket.off(ACTIONS.USERNAME_EXISTS)
            socket.off(ACTIONS.JOIN_ACCEPTED)
            socket.off(ACTIONS.USER_DISCONNECTED)
            socket.off(ACTIONS.REQUEST_DRAWING)
            socket.off(ACTIONS.SYNC_DRAWING)
        }
    }, [
        handleDrawingSync,
        handleError,
        handleJoiningAccept,
        handleRequestDrawing,
        handleUserLeft,
        handleUsernameExist,
        setUsers,
        socket,
    ])

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
