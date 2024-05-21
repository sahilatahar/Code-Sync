import ChatInput from "@/components/chats/ChatInput"
import ChatList from "@/components/chats/ChatList"
import useWindowDimensions from "@/hooks/useWindowDimensions"

const ChatsTab = () => {
    const { tabHeight } = useWindowDimensions()

    return (
        <div
            className="flex max-h-full min-h-[400px] w-full flex-col gap-2 p-4"
            style={{ height: tabHeight }}
        >
            <h1 className="tab-title">Group Chat</h1>
            {/* Chat list */}
            <ChatList />
            {/* Chat input */}
            <ChatInput />
        </div>
    )
}

export default ChatsTab
