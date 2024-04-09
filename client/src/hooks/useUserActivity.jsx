import ACTIONS from "@/utils/actions"
import { useCallback, useEffect } from "react"
import useAppContext from "./useAppContext"
import useSocket from "./useSocket"

function useUserActivity() {
    const { setUsers } = useAppContext()
    const { socket } = useSocket()

    const handleUserVisibilityChange = useCallback(() => {
        if (document.visibilityState === "visible")
            socket.emit(ACTIONS.USER_ONLINE, { socketId: socket.id })
        else if (document.visibilityState === "hidden") {
            socket.emit(ACTIONS.USER_OFFLINE, { socketId: socket.id })
        }
    }, [socket])

    const handleUserOnline = useCallback(
        ({ socketId }) => {
            setUsers((users) => {
                return users.map((user) => {
                    if (user.socketId === socketId) {
                        return { ...user, status: ACTIONS.USER_ONLINE }
                    }
                    return user
                })
            })
        },
        [setUsers],
    )

    const handleUserOffline = useCallback(
        ({ socketId }) => {
            setUsers((users) => {
                return users.map((user) => {
                    if (user.socketId === socketId) {
                        return { ...user, status: ACTIONS.USER_OFFLINE }
                    }
                    return user
                })
            })
        },
        [setUsers],
    )

    const handleUserTyping = useCallback(
        ({ user }) => {
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

        socket.on(ACTIONS.USER_ONLINE, handleUserOnline)
        socket.on(ACTIONS.USER_OFFLINE, handleUserOffline)
        socket.on(ACTIONS.TYPING_START, handleUserTyping)
        socket.on(ACTIONS.TYPING_PAUSE, handleUserTyping)

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleUserVisibilityChange,
            )

            socket.off(ACTIONS.USER_ONLINE)
            socket.off(ACTIONS.USER_OFFLINE)
            socket.off(ACTIONS.TYPING_START)
            socket.off(ACTIONS.TYPING_PAUSE)
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
