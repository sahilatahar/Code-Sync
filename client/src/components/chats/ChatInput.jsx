import { useRef } from "react"
import { PaperPlaneRight } from "@phosphor-icons/react"
import ACTIONS from "@/utils/actions"
import { formatDate } from "@/utils/formateDate"
import useAppContext from "@/hooks/useAppContext"
import useChatRoom from "@/hooks/useChatRoom"
import useSocket from "@/hooks/useSocket"

function ChatInput() {
    const { currentUser } = useAppContext()
    const { socket } = useSocket()
    const { setMessages } = useChatRoom()
    const inputRef = useRef(null)

    const handleSendMessage = (e) => {
        e.preventDefault()

        const inputVal = inputRef.current.value.trim()

        if (inputVal.length > 0) {
            const message = {
                message: inputVal,
                username: currentUser.username,
                timestamp: formatDate(new Date()),
            }
            socket.emit(ACTIONS.SEND_MESSAGE, { message })
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
