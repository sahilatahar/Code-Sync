import { useChatRoom } from "@/context/ChatContext"
import { useViews } from "@/context/ViewContext"
import { VIEWS } from "@/types/view"
import { useState } from "react"
import { Tooltip } from "react-tooltip"
import { buttonStyles, tooltipStyles } from "../tooltipStyles"

interface ViewButtonProps {
    viewName: VIEWS
    icon: JSX.Element
}

const ViewButton = ({ viewName, icon }: ViewButtonProps) => {
    const { activeView, setActiveView, isSidebarOpen, setIsSidebarOpen } =
        useViews()
    const { isNewMessage } = useChatRoom()
    const [showTooltip, setShowTooltip] = useState(true)

    const handleViewClick = (viewName: VIEWS) => {
        if (viewName === activeView) {
            setIsSidebarOpen(!isSidebarOpen)
        } else {
            setIsSidebarOpen(true)
            setActiveView(viewName)
        }
    }

    return (
        <div className="relative flex flex-col items-center">
            <button
                onClick={() => handleViewClick(viewName)}
                onMouseEnter={() => setShowTooltip(true)} // Show tooltip again on hover
                className={`${buttonStyles.base} ${buttonStyles.hover}`}
                {...(showTooltip && {
                    "data-tooltip-id": `tooltip-${viewName}`,
                    "data-tooltip-content": viewName,
                })}
            >
                <div className="flex items-center justify-center">{icon}</div>
                {/* Show dot for new message in chat View Button */}
                {viewName === VIEWS.CHATS && isNewMessage && (
                    <div className="absolute right-0 top-0 h-3 w-3 rounded-full bg-primary"></div>
                )}
            </button>
            {/* render the tooltip */}
            {showTooltip && (
                <Tooltip
                    id={`tooltip-${viewName}`}
                    place="right"
                    offset={25}
                    className="!z-50"
                    style={tooltipStyles}
                    noArrow={false}
                    positionStrategy="fixed"
                    float={true}
                />
            )}
        </div>
    )
}

export default ViewButton
