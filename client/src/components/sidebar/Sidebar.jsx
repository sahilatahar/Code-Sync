import useResponsive from "@/hooks/useResponsive"
import useTab from "@/hooks/useTabs"
import TabButton from "@/components/tabs/TabButton"
import TABS from "@/utils/tabs"

function Sidebar() {
    const { activeTab, isSidebarOpen, tabComponents, tabIcons } = useTab()
    const { showSidebar } = useResponsive()

    return (
        <aside className="flex w-full md:h-full md:max-h-full md:min-h-full md:w-auto">
            <div
                className="fixed bottom-0 left-0 z-50 flex h-[50px] w-full gap-6 self-end overflow-auto border-t border-darkHover bg-dark p-3 md:static md:h-full md:w-[50px] md:min-w-[50px] md:flex-col md:border-r md:border-t-0 md:p-2 md:pt-4"
                style={showSidebar ? {} : { display: "none" }}
            >
                <TabButton tabName={TABS.FILES} icon={tabIcons[TABS.FILES]} />
                <TabButton tabName={TABS.CHATS} icon={tabIcons[TABS.CHATS]} />
                <TabButton
                    tabName={TABS.CLIENTS}
                    icon={tabIcons[TABS.CLIENTS]}
                />
                <TabButton
                    tabName={TABS.SETTINGS}
                    icon={tabIcons[TABS.SETTINGS]}
                />
            </div>
            <div
                className="absolute left-0 top-0 z-20 w-full flex-grow flex-col bg-dark md:static md:w-[300px]"
                style={isSidebarOpen ? {} : { display: "none" }}
            >
                {tabComponents[activeTab]}
            </div>
        </aside>
    )
}

export default Sidebar
