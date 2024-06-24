import { useEffect, useState } from "react"
import useWindowDimensions from "./useWindowDimensions"

// This hook is used to hide sidebar when keyboard is open on mobile devices
function useResponsive() {
    const [minHeightReached, setMinHeightReached] = useState(false)
    const { height } = useWindowDimensions()

    useEffect(() => {
        if (height < 500) {
            setMinHeightReached(true)
        } else {
            setMinHeightReached(false)
        }
    }, [height])

    return { minHeightReached}
}

export default useResponsive
