import { useEffect, useState } from "react"
import useWindowDimensions from "./useWindowDimensions"

// This hook is used to hide sidebar when keyboard is open on mobile devices
function useResponsive() {
    const [showSidebar, setShowSidebar] = useState<boolean>(false)
    const { height } = useWindowDimensions()

    useEffect(() => {
        if (height < 500) {
            setShowSidebar(false)
        } else {
            setShowSidebar(true)
        }
    }, [height])

    return { showSidebar }
}

export default useResponsive
