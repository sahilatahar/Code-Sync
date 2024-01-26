import PropTypes from "prop-types"
import { useContext } from "react"
import { Context } from "../../context/ContextProvider"
import useLocalStorage from "../../hooks/useLocalStorage"

function TabButton({ tabName, activeTab, setActiveTab }) {
    const { settings, updateSettings } = useContext(Context)
    const { setItem } = useLocalStorage()

    const activeTabButtonBorder = (tabName) => {
        if (activeTab === tabName) return "bg-white text-black"
        return "text-white"
    }

    const handleTabButtonClick = (tabName) => {
        setActiveTab(tabName)
        const newSettings = { ...settings, lastOpenTab: tabName }
        updateSettings(newSettings)
        setItem("settings", JSON.stringify(newSettings))
    }

    const buttonClassName = "flex-grow pt-1 rounded-t-md"

    return (
        <button
            onClick={() => handleTabButtonClick(tabName)}
            className={activeTabButtonBorder(tabName) + " " + buttonClassName}
        >
            {tabName}
        </button>
    )
}

TabButton.propTypes = {
    tabName: PropTypes.string.isRequired,
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired,
}

export default TabButton
