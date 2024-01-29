import PropTypes from "prop-types"
import { createContext, useState } from "react"
import { HiOutlineUsers } from "react-icons/hi2"
import { IoSettingsOutline } from "react-icons/io5"
import { PiChats } from "react-icons/pi"
import { VscFiles } from "react-icons/vsc"
import ChatPanel from "../components/chat/ChatPanel"
import UsersTab from "../components/tabs/UsersTab"
import FilesTab from "../components/tabs/FilesTab"
import SettingsTab from "../components/tabs/SettingsTab"
import TABS from "../utils/tabs"

const TabContext = createContext()

function TabContextProvider({ children }) {
    const [activeTab, setActiveTab] = useState(TABS.Editor)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [tabComponents, setTabComponents] = useState({
        [TABS.FILES]: <FilesTab />,
        [TABS.USERS]: <UsersTab />,
        [TABS.SETTINGS]: <SettingsTab />,
        [TABS.Chat]: <ChatPanel />,
    })
    const tabIcons = {
        [TABS.FILES]: <VscFiles size={30} />,
        [TABS.USERS]: <HiOutlineUsers size={30} />,
        [TABS.SETTINGS]: <IoSettingsOutline size={30} />,
        [TABS.Chat]: <PiChats size={32} />,
    }

    return (
        <TabContext.Provider
            value={{
                activeTab,
                setActiveTab,
                isSidebarOpen,
                setIsSidebarOpen,
                tabComponents,
                setTabComponents,
                tabIcons,
            }}
        >
            {children}
        </TabContext.Provider>
    )
}

TabContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { TabContextProvider }
export default TabContext
