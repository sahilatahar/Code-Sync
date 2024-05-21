enum TABS {
    FILES = "FILES",
    CHATS = "CHATS",
    CLIENTS = "CLIENTS",
    RUN = "RUN",
    SETTINGS = "SETTINGS",
}

interface TabContext {
    activeTab: TABS
    setActiveTab: (activeTab: TABS) => void
    isSidebarOpen: boolean
    setIsSidebarOpen: (isSidebarOpen: boolean) => void
    tabComponents: { [key in TABS]: JSX.Element }
    tabIcons: { [key in TABS]: JSX.Element }
}

export { TABS, TabContext }
