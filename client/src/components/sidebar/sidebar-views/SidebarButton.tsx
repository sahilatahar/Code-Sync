import { useChatRoom } from "@/context/ChatContext"
import { useViews } from "@/context/ViewContext"
import { VIEWS } from "@/types/view"
import { Tooltip } from 'react-tooltip'
import { useState } from 'react'

interface ViewButtonProps {
    viewName: VIEWS
    icon: JSX.Element
}
//*Tooltip Styles
const tooltipStyles = {
    backgroundColor: '#e0e0e0',
    padding: '8px 12px',
    borderRadius: '6px',
    color:'#000',
    fontSize: '12px',
    fontWeight:'500',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
}

const buttonStyles = {
    base: "relative flex items-center justify-center rounded transition-colors duration-200 ease-in-out p-2",
    hover: "hover:bg-[#3D404A]",
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
        <div className="relative flex items-center flex-col">
        <button
            onClick={() => handleViewClick(viewName)}
            onMouseEnter={() => setShowTooltip(true)} // Show tooltip again on hover
            className={`${buttonStyles.base} ${buttonStyles.hover}`}
            data-tooltip-id={`tooltip-${viewName}`}
            data-tooltip-content={viewName}
        >
            <div className="flex items-center justify-center">
                {icon}
            </div>
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
