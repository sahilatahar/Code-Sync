import ChatsTab from "@/components/tabs/ChatsTab"
import FilesTab from "@/components/tabs/FilesTab"
import RunTab from "@/components/tabs/RunTab"
import SettingsTab from "@/components/tabs/SettingsTab"
import UsersTab from "@/components/tabs/UsersTab"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { TABS, TabContext as TabContextType } from "@/types/tab"
import { ReactNode, createContext, useContext, useState } from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { LuFiles } from "react-icons/lu"
import { PiChats, PiPlay, PiUsers } from "react-icons/pi"

const TabContext = createContext<TabContextType | null>(null)

export const useTabs = (): TabContextType => {
    const context = useContext(TabContext)
    if (context === null) {
        throw new Error("useTabs must be used within a TabContextProvider")
    }
    return context
}

function TabContextProvider({ children }: { children: ReactNode }) {
    const { isMobile } = useWindowDimensions()
    const [activeTab, setActiveTab] = useState<TABS>(TABS.FILES)
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(!isMobile)
    const tabComponents = {
        [TABS.FILES]: <FilesTab />,
        [TABS.CLIENTS]: <UsersTab />,
        [TABS.SETTINGS]: <SettingsTab />,
        [TABS.CHATS]: <ChatsTab />,
        [TABS.RUN]: <RunTab />,
    }
    const tabIcons = {
        [TABS.FILES]: <LuFiles size={28} />,
        [TABS.CLIENTS]: <PiUsers size={30} />,
        [TABS.SETTINGS]: <IoSettingsOutline size={28} />,
        [TABS.CHATS]: <PiChats size={30} />,
        [TABS.RUN]: <PiPlay size={28} />,
    }

    return (
        <TabContext.Provider
            value={{
                activeTab,
                setActiveTab,
                isSidebarOpen,
                setIsSidebarOpen,
                tabComponents,
                tabIcons,
            }}
        >
            {children}
        </TabContext.Provider>
    )
}

export { TabContextProvider }
export default TabContext
