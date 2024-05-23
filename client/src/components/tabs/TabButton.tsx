import { useChatRoom } from "@/context/ChatContext"
import { useTabs } from "@/context/TabContext"
import { TABS } from "@/types/tab"

interface TabButtonProps {
    tabName: TABS
    icon: JSX.Element
}

const TabButton = ({ tabName, icon }: TabButtonProps) => {
    const { activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen } =
        useTabs()
    const { isNewMessage } = useChatRoom()

    const handleTabClick = (tabName: TABS) => {
        if (tabName === activeTab) {
            setIsSidebarOpen(!isSidebarOpen)
        } else {
            setIsSidebarOpen(true)
            setActiveTab(tabName)
        }
    }

    return (
        <button
            onClick={() => handleTabClick(tabName)}
            className="relative flex items-center justify-center"
        >
            {icon}
            {/* Show dot for new message in chat Tab Button */}
            {tabName === TABS.CHATS && isNewMessage && (
                <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-primary"></div>
            )}
        </button>
    )
}

export default TabButton
