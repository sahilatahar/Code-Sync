import { useContext, useRef } from "react"
import { PaperPlaneRight } from "@phosphor-icons/react"
import AppContext from "../../context/AppContext"
import ACTIONS from "../../utils/actions"
import { formatDate } from "../../utils/formateDate"
import ChatContext from "../../context/ChatContext"

function ChatInput() {
    const { socket, clients, roomId } = useContext(AppContext)
    const { setMessages } = useContext(ChatContext)
    const inputRef = useRef(null)

    const handleSendMessage = (e) => {
        e.preventDefault()

        const inputVal = inputRef.current.value.trim()
        const client = clients.find((client) => client.socketId === socket.id)

        if (inputVal.length > 0) {
            const message = {
                message: inputVal,
                username: client?.username || "Unknown",
                socketId: socket.id,
                timestamp: formatDate(new Date()),
            }
            socket.emit(ACTIONS.SEND_MESSAGE, { roomId, message })
            setMessages((messages) => [...messages, message])
            inputRef.current.value = ""
        }
    }

    return (
        <form
            onSubmit={handleSendMessage}
            className="flex justify-between rounded-md border border-primary"
        >
            <input
                type="text"
                className="w-full flex-grow rounded-md border-none bg-dark p-2 outline-none"
                placeholder="Enter a message..."
                ref={inputRef}
            />
            <button
                className="flex items-center justify-center rounded-r-md  bg-primary p-2 text-black"
                type="submit"
            >
                <PaperPlaneRight size={24} weight="fill" />
            </button>
        </form>
    )
}

export default ChatInput
