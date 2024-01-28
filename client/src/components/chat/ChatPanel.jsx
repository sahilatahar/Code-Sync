import { useContext, useEffect, useRef } from "react"
import AppContext from "../../context/AppContext"
import ChatContext from "../../context/ChatContext"
import ChatInput from "./ChatInput"

function ChatPanel() {
    const {
        messages,
        isNewMessage,
        setIsNewMessage,
        lastScrollHeight,
        setLastScrollHeight,
    } = useContext(ChatContext)
    const { socket } = useContext(AppContext)
    const messagesContainerRef = useRef(null)

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight
    }, [messages])

    useEffect(() => {
        if (isNewMessage) {
            setIsNewMessage(false)
        }
        messagesContainerRef.current.scrollTop = lastScrollHeight
    }, [isNewMessage, setIsNewMessage, lastScrollHeight])

    const handleScroll = (e) => {
        setLastScrollHeight(e.target.scrollTop)
    }

    return (
        <div className="tab-height flex max-h-full min-h-[500px] w-full flex-col gap-4 p-4">
            <h1 className="text-base">Group Chat</h1>
            <div
                className="flex-grow overflow-auto rounded-md border-t-4 border-primary bg-darkHover p-2"
                ref={messagesContainerRef}
                onScroll={handleScroll}
            >
                {/* Chat messages */}
                {messages.map((message, index) => {
                    return (
                        <div
                            key={index}
                            className={
                                "mb-2 w-[80%] self-end break-words rounded-md bg-dark px-3 py-2" +
                                (message.socketId === socket.id
                                    ? " ml-auto "
                                    : "")
                            }
                        >
                            <div className="flex justify-between">
                                <span className="text-xs text-primary">
                                    {message.username}
                                </span>
                                <span className="text-xs text-white">
                                    {message.timestamp}
                                </span>
                            </div>
                            <p className="py-1">{message.message}</p>
                        </div>
                    )
                })}
            </div>
            {/* Chat input */}
            <ChatInput />
        </div>
    )
}

export default ChatPanel
