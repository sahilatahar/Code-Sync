import PropTypes from "prop-types"
import { useContext } from "react"
import TabContext from "../../context/TabContext"
import useWindowDimensions from "../../hooks/useWindowDimensions"

function TabButton({ tabName, icon }) {
    const { activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen } =
        useContext(TabContext)
    const { isMobile } = useWindowDimensions()

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
            className="flex items-center justify-center"
        >
            {icon}
        </button>
    )
}

TabButton.propTypes = {
    tabName: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
}

export default TabButton
