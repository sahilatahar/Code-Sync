import { useContext, useRef } from "react"
import AppContext from "../../context/AppContext"
import ChatContext from "../../context/ChatContext"
import ChatInput from "./ChatInput"

function ChatPanel() {
    const { messages, setMessages } = useContext(ChatContext)
    const { socket } = useContext(AppContext)
    const messagesContainerRef = useRef(null)

    return (
        <div className="tab-height flex max-h-full min-h-[500px] w-full flex-col gap-4 p-4">
            <h1 className="text-base">Group Chat</h1>
            <div
                className="flex-grow overflow-auto rounded-md border-t-4 border-primary bg-darkHover p-2"
                ref={messagesContainerRef}
            >
                {/* Chat messages */}
                {messages.map((message, index) => {
                    return (
                        <div
                            key={index}
                            className={
                                "mb-2 w-[80%] self-end rounded-md bg-dark p-2" +
                                (message.socketId === socket.id
                                    ? " ml-auto "
                                    : "")
                            }
                        >
                            <span className="text-xs text-primary">
                                {message.username}
                            </span>
                            <p>{message.message}</p>
                        </div>
                    )
                })}
            </div>
            {/* Chat input */}
            <ChatInput
                setMessages={setMessages}
                messagesContainerRef={messagesContainerRef}
            />
        </div>
    )
}

export default ChatPanel
