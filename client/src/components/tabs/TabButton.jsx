import PropTypes from "prop-types"

function TabButton({ tabName, activeTab, setActiveTab }) {
    const activeTabButtonBorder = (tabName) => {
        if (activeTab === tabName) return "bg-white text-black"
        return "text-white"
    }

    const buttonClassName = "flex-grow pt-1 rounded-t-md"

    return (
        <button
            onClick={() => setActiveTab(tabName)}
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
