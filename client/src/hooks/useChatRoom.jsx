import { useContext, useEffect, useState } from "react"
import AppContext from "../context/AppContext"
import ACTIONS from "../utils/actions"

function useChatRoom() {
    const [messages, setMessages] = useState([])
    const { socket } = useContext(AppContext)

    useEffect(() => {
        if (socket === null) return

        socket.on(ACTIONS.RECEIVE_MESSAGE, ({ message }) => {
            setMessages((messages) => [...messages, message])
        })

        return () => socket.off(ACTIONS.RECEIVE_MESSAGE)
    }, [socket])

    return { messages, setMessages }
}

export default useChatRoom
