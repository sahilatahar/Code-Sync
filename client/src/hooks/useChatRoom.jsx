import ChatContext from "@/context/ChatContext"
import { useContext } from "react"

function useChatRoom() {
    return useContext(ChatContext)
}

export default useChatRoom
