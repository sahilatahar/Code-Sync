import { useContext, useEffect } from "react"
import { Context } from "../context/ContextProvider"
import ACTIONS from "../utils/actions"
import { useParams } from "react-router-dom"

function useTabVisibility() {
    const { socket, setClients } = useContext(Context)
    const { roomId } = useParams()

    useEffect(() => {
        if (socket === null) return

        const handleTabVisibilityChange = () => {
            if (document.visibilityState === "visible")
                socket.emit(ACTIONS.ONLINE, { socketId: socket.id, roomId })
            else if (document.visibilityState === "hidden") {
                socket.emit(ACTIONS.OFFLINE, { socketId: socket.id, roomId })
            }
        }

        document.addEventListener("visibilitychange", handleTabVisibilityChange)

        socket.on(ACTIONS.ONLINE, ({ socketId }) => {
            setClients((clients) => {
                return clients.map((client) => {
                    if (client.socketId === socketId) {
                        return { ...client, status: ACTIONS.ONLINE }
                    }
                    return client
                })
            })
        })

        socket.on(ACTIONS.OFFLINE, ({ socketId }) => {
            setClients((clients) => {
                return clients.map((client) => {
                    if (client.socketId === socketId) {
                        return { ...client, status: ACTIONS.OFFLINE }
                    }
                    return client
                })
            })
        })

        return () => {
            document.removeEventListener(
                "visibilitychange",
                handleTabVisibilityChange,
            )
            if (socket === null) return
            socket.off(ACTIONS.ONLINE)
            socket.off(ACTIONS.OFFLINE)
        }
    }, [socket, roomId, setClients])
}

export default useTabVisibility
