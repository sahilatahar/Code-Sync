import PropTypes from "prop-types"
import { useContext } from "react"
import TabContext from "../../context/TabContext"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import TABS from "../../utils/tabs"
import ChatContext from "../../context/ChatContext"

function TabButton({ tabName, icon }) {
    const { activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen } =
        useContext(TabContext)
    const { isMobile } = useWindowDimensions()
    const { isNewMessage } = useContext(ChatContext)

    const handleTabClick = (tabName) => {
        if (tabName === activeTab && !isMobile) {
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
            {tabName === TABS.Chat && isNewMessage && (
                <div className="bg-success  absolute right-0 top-0 h-3 w-3 rounded-full"></div>
            )}
        </button>
    )
}

TabButton.propTypes = {
    tabName: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
}

export default TabButton
