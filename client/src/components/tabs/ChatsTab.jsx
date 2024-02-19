import ChatInput from "../chats/ChatInput"
import ChatList from "../chats/ChatList"

function ChatsTab() {
    return (
        <div className="tab-height flex max-h-full min-h-[500px] w-full flex-col gap-4 p-4">
            <h1 className="text-base">Group Chat</h1>
            {/* Chat list */}
            <ChatList />
            {/* Chat input */}
            <ChatInput />
        </div>
    )
}

export default ChatsTab
