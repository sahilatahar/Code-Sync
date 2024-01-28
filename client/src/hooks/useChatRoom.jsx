import { useContext, useEffect, useState } from "react"
import AppContext from "../context/AppContext"
import ACTIONS from "../utils/actions"

function useChatRoom() {
    const { socket } = useContext(AppContext)
    const [messages, setMessages] = useState([])
    const [isNewMessage, setIsNewMessage] = useState(false)

    useEffect(() => {
        if (socket === null) return

        socket.on(ACTIONS.RECEIVE_MESSAGE, ({ message }) => {
            setMessages((messages) => [...messages, message])
            setIsNewMessage(true)
        })

        return () => socket.off(ACTIONS.RECEIVE_MESSAGE)
    }, [socket])

    return { messages, setMessages, isNewMessage, setIsNewMessage }
}

export default useChatRoom
