import { useEffect, useState, useContext } from "react"
import useWindowDimensions from "./useWindowDimensions"
import TABS from "../utils/tabs"
import TabContext from "../context/TabContext"

function useResponsive() {
    const { activeTab, setActiveTab, setIsSidebarOpen } = useContext(TabContext)
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const { height, isMobile } = useWindowDimensions()

    useEffect(() => {
        if (!isMobile && activeTab === TABS.Editor) {
            setIsSidebarOpen(false)
        }
    }, [activeTab, isMobile, setIsSidebarOpen])

    useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(true)
            setActiveTab(TABS.Editor)
        }
    }, [isMobile, setActiveTab, setIsSidebarOpen])

    useEffect(() => {
        if (height < 500) {
            setIsMobileSidebarOpen(false)
        } else {
            setIsMobileSidebarOpen(true)
        }
    }, [height])

    return { isMobileSidebarOpen }
}

export default useResponsive
