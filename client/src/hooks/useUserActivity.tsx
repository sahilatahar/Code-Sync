import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { MessageEvent, SocketId } from "@/types/socket"
import { RemoteUser, USER_CONNECTION_STATUS } from "@/types/user"
import { useCallback, useEffect } from "react"

function useUserActivity() {
    const { setUsers } = useAppContext()
    const { socket } = useSocket()

    const handleUserVisibilityChange = useCallback(() => {
        if (document.visibilityState === "visible")
            socket.emit(MessageEvent.USER_ONLINE, { socketId: socket.id })
        else if (document.visibilityState === "hidden") {
            socket.emit(MessageEvent.USER_OFFLINE, { socketId: socket.id })
        }
    }, [socket])

    const handleUserOnline = useCallback(
        ({ socketId }: { socketId: SocketId }) => {
            setUsers((users) => {
                return users.map((user) => {
                    if (user.socketId === socketId) {
                        return {
                            ...user,
                            status: USER_CONNECTION_STATUS.ONLINE,
                        }
                    }
                    return user
                })
            })
        },
        [setUsers],
    )

    const handleUserOffline = useCallback(
        ({ socketId }: { socketId: SocketId }) => {
            setUsers((users) => {
                return users.map((user) => {
                    if (user.socketId === socketId) {
                        return {
                            ...user,
                            status: USER_CONNECTION_STATUS.OFFLINE,
                        }
                    }
                    return user
                })
            })
        },
        [setUsers],
    )

    const handleUserTyping = useCallback(
        ({ user }: { user: RemoteUser }) => {
            setUsers((users) => {
                return users.map((u) => {
                    if (u.socketId === user.socketId) {
                        return user
                    }
                    return u
                })
            })
        },
        [setUsers],
    )

    useEffect(() => {
        document.addEventListener(
            "visibilitychange",
            handleUserVisibilityChange,
        )

        socket.on(MessageEvent.USER_ONLINE, handleUserOnline)
        socket.on(MessageEvent.USER_OFFLINE, handleUserOffline)
        socket.on(MessageEvent.TYPING_START, handleUserTyping)
        socket.on(MessageEvent.TYPING_PAUSE, handleUserTyping)

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleUserVisibilityChange,
            )

            socket.off(MessageEvent.USER_ONLINE)
            socket.off(MessageEvent.USER_OFFLINE)
            socket.off(MessageEvent.TYPING_START)
            socket.off(MessageEvent.TYPING_PAUSE)
        }
    }, [
        socket,
        setUsers,
        handleUserVisibilityChange,
        handleUserOnline,
        handleUserOffline,
        handleUserTyping,
    ])
}

export default useUserActivity
