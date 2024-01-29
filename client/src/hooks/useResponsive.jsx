import { useEffect, useState } from "react"
import useWindowDimensions from "./useWindowDimensions"

function useResponsive() {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const { height } = useWindowDimensions()

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
