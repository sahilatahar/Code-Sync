import TabButton from "@/components/tabs/TabButton"
import { useAppContext } from "@/context/AppContext"
import { useSocket } from "@/context/SocketContext"
import { useTabs } from "@/context/TabContext"
import useResponsive from "@/hooks/useResponsive"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { ACTIVITY_STATE } from "@/types/app"
import { MessageEvent } from "@/types/socket"
import { TABS } from "@/types/tab"
import { IoCodeSlash } from "react-icons/io5"
import { MdOutlineDraw } from "react-icons/md"

function Sidebar() {
    const {
        activeTab,
        isSidebarOpen,
        tabComponents,
        tabIcons,
        setIsSidebarOpen,
    } = useTabs()
    const { showSidebar } = useResponsive()
    const { activityState, setActivityState } = useAppContext()
    const { socket } = useSocket()
    const { isMobile } = useWindowDimensions()

    const changeState = () => {
        if (activityState === ACTIVITY_STATE.CODING) {
            setActivityState(ACTIVITY_STATE.DRAWING)
            socket.emit(MessageEvent.REQUEST_DRAWING)
        } else {
            setActivityState(ACTIVITY_STATE.CODING)
        }

        if (isMobile) {
            setIsSidebarOpen(false)
        }
    }

    return (
        <aside className="flex w-full md:h-full md:max-h-full md:min-h-full md:w-auto">
            <div
                className="fixed bottom-0 left-0 z-50 flex h-[50px] w-full gap-6 self-end overflow-auto border-t border-darkHover bg-dark p-3 md:static md:h-full md:w-[50px] md:min-w-[50px] md:flex-col md:border-r md:border-t-0 md:p-2 md:pt-4"
                style={showSidebar ? {} : { display: "none" }}
            >
                <TabButton tabName={TABS.FILES} icon={tabIcons[TABS.FILES]} />
                <TabButton tabName={TABS.CHATS} icon={tabIcons[TABS.CHATS]} />
                <TabButton tabName={TABS.RUN} icon={tabIcons[TABS.RUN]} />
                <TabButton
                    tabName={TABS.CLIENTS}
                    icon={tabIcons[TABS.CLIENTS]}
                />
                <TabButton
                    tabName={TABS.SETTINGS}
                    icon={tabIcons[TABS.SETTINGS]}
                />

                {/* Button to change activity state coding or drawing */}
                <button className="self-end" onClick={changeState}>
                    {activityState === ACTIVITY_STATE.CODING ? (
                        <MdOutlineDraw size={30} />
                    ) : (
                        <IoCodeSlash size={30} />
                    )}
                </button>
            </div>
            <div
                className="absolute left-0 top-0 z-20 w-full flex-grow flex-col bg-dark md:static md:w-[300px]"
                style={isSidebarOpen ? {} : { display: "none" }}
            >
                {/* Render the active tab component */}
                {tabComponents[activeTab]}
            </div>
        </aside>
    )
}

export default Sidebar
