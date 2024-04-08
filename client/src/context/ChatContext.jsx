import { createContext, useState, useEffect } from "react"
import PropTypes from "prop-types"
import useSocket from "@/hooks/useSocket"
import ACTIONS from "@/utils/actions"

const ChatContext = createContext()

function ChatContextProvider({ children }) {
    const { socket } = useSocket()
    const [messages, setMessages] = useState([])
    const [isNewMessage, setIsNewMessage] = useState(false)
    const [lastScrollHeight, setLastScrollHeight] = useState(0)

    useEffect(() => {
        socket.on(ACTIONS.RECEIVE_MESSAGE, ({ message }) => {
            setMessages((messages) => [...messages, message])
            setIsNewMessage(true)
        })
        return () => socket.off(ACTIONS.RECEIVE_MESSAGE)
    }, [socket])

    return (
        <ChatContext.Provider
            value={{
                messages,
                setMessages,
                isNewMessage,
                setIsNewMessage,
                lastScrollHeight,
                setLastScrollHeight,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

ChatContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { ChatContextProvider }
export default ChatContext
