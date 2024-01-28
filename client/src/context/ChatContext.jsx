import { createContext, useState } from "react"
import PropTypes from "prop-types"
import useChatRoom from "../hooks/useChatRoom"

const ChatContext = createContext()

function ChatContextProvider({ children }) {
    const { messages, setMessages, isNewMessage, setIsNewMessage } =
        useChatRoom()
    const [lastScrollHeight, setLastScrollHeight] = useState(0)

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
