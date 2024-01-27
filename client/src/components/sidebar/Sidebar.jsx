import PropTypes from "prop-types"
import closeIcon from "../../assets/close.svg"
import { useContext, useState } from "react"
import FilesTab from "../tabs/FilesTab"
import ConnectedTab from "../tabs/ConnectedTab"
import SettingsTab from "../tabs/SettingsTab"
import TABS from "../../utils/tabs"
import TabButton from "../tabs/TabButton"
import { Context } from "../../context/ContextProvider"

function Sidebar({ sidebarRef }) {
    const { settings } = useContext(Context)
    const [activeTab, setActiveTab] = useState(settings.lastOpenTab)

    const hideSidebar = () =>
        sidebarRef.current.classList.add("-translate-x-full")

    const handleTabClick = (tabName) => {
        setActiveTab(tabName)
    }

    return (
        <aside
            className="duration-400 absolute left-0 top-0 z-10 flex h-screen max-h-full min-h-full w-full min-w-[300px] -translate-x-full flex-col overflow-auto bg-dark p-4 transition-transform sm:static sm:w-[300px] sm:translate-x-0"
            ref={sidebarRef}
        >
            {/* Close menu button */}
            <button className="absolute right-4 top-5 block sm:hidden">
                <img
                    src={closeIcon}
                    alt=""
                    className="h-6 w-6"
                    onClick={hideSidebar}
                />
            </button>

            {/* Tab buttons */}
            <div className="mb-4 flex w-[90%] gap-2 border-b-2 border-b-white sm:w-full">
                <TabButton
                    activeTab={activeTab}
                    setActiveTab={handleTabClick}
                    tabName={TABS.HOME}
                />
                <TabButton
                    activeTab={activeTab}
                    setActiveTab={handleTabClick}
                    tabName={TABS.FILES}
                />
                <TabButton
                    activeTab={activeTab}
                    setActiveTab={handleTabClick}
                    tabName={TABS.SETTINGS}
                />
            </div>

            {/* Tabs */}
            {activeTab === TABS.FILES && <FilesTab hideSidebar={hideSidebar} />}
            {activeTab === TABS.HOME && <ConnectedTab />}
            {activeTab === TABS.SETTINGS && <SettingsTab />}
        </aside>
    )
}

Sidebar.propTypes = {
    sidebarRef: PropTypes.object.isRequired,
}

export default Sidebar
