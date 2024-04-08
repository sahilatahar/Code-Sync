import PropTypes from "prop-types"
import { createContext, useState } from "react"
import { Files, Users, Gear, Chats } from "@phosphor-icons/react"
import ChatsTab from "@/components/tabs/ChatsTab"
import UsersTab from "@/components/tabs/UsersTab"
import FilesTab from "@/components/tabs/FilesTab"
import SettingsTab from "@/components/tabs/SettingsTab"
import TABS from "@/utils/tabs"
import useWindowDimensions from "@/hooks/useWindowDimensions"

const TabContext = createContext()

function TabContextProvider({ children }) {
    const { isMobile } = useWindowDimensions()
    const [activeTab, setActiveTab] = useState(TABS.FILES)
    const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile)
    const [tabComponents, setTabComponents] = useState({
        [TABS.FILES]: <FilesTab />,
        [TABS.CLIENTS]: <UsersTab />,
        [TABS.SETTINGS]: <SettingsTab />,
        [TABS.CHATS]: <ChatsTab />,
    })
    const tabIcons = {
        [TABS.FILES]: <Files size={32} />,
        [TABS.CLIENTS]: <Users size={30} />,
        [TABS.SETTINGS]: <Gear size={30} />,
        [TABS.CHATS]: <Chats size={32} />,
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
