import { useChatRoom } from "@/context/ChatContext"
import { useViews } from "@/context/ViewContext"
import { VIEWS } from "@/types/view"

interface ViewButtonProps {
    viewName: VIEWS
    icon: JSX.Element
}

const ViewButton = ({ viewName, icon }: ViewButtonProps) => {
    const { activeView, setActiveView, isSidebarOpen, setIsSidebarOpen } =
        useViews()
    const { isNewMessage } = useChatRoom()

    const handleViewClick = (viewName: VIEWS) => {
        if (viewName === activeView) {
            setIsSidebarOpen(!isSidebarOpen)
        } else {
            setIsSidebarOpen(true)
            setActiveView(viewName)
        }
    }

    return (
        <button
            onClick={() => handleViewClick(viewName)}
            className="relative flex items-center justify-center rounded transition-colors duration-200 ease-in-out hover:bg-[#3D404A] p-2" 
        >
            <div className="flex items-center justify-center">
                {icon}
            </div>
            {/* Show dot for new message in chat View Button */}
            {viewName === VIEWS.CHATS && isNewMessage && (
                <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-primary"></div>
            )}
        </button>
    )
}

export default ViewButton
