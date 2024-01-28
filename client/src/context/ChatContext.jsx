import { createContext } from "react"
import PropTypes from "prop-types"
import useChatRoom from "../hooks/useChatRoom"

const ChatContext = createContext()

function ChatContextProvider({ children }) {
    const { messages, setMessages } = useChatRoom()
    return (
        <ChatContext.Provider
            value={{
                messages,
                setMessages,
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
