import useWindowDimensions from "@/hooks/useWindowDimensions"
import ChatInput from "@/components/chats/ChatInput"
import ChatList from "@/components/chats/ChatList"

function ChatsTab() {
    const { tabHeight } = useWindowDimensions()

    return (
        <div
            className="flex max-h-full min-h-[500px] w-full flex-col gap-4 p-4"
            style={{ height: tabHeight }}
        >
            <h1 className="tab-base">Group Chat</h1>
            {/* Chat list */}
            <ChatList />
            {/* Chat input */}
            <ChatInput />
        </div>
    )
}

export default ChatsTab
