import { createContext, useState } from "react"
import PropTypes from "prop-types"
import useChatRoomContext from "@/hooks/useChatRoomContext"

const ChatContext = createContext()

function ChatContextProvider({ children }) {
    const { messages, setMessages, isNewMessage, setIsNewMessage } =
        useChatRoomContext()
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
