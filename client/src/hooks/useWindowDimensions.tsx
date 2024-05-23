import { useEffect, useState } from "react"

interface WindowDimensions {
    width: number
    height: number
}

function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
        width: window.innerWidth,
        height: window.innerHeight,
    })
    const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768)
    const tabHeight = isMobile
        ? windowDimensions.height - 50
        : windowDimensions.height

    useEffect(() => {
        const updateWindowDimensions = () => {
            setWindowDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            })
            setIsMobile(window.innerWidth < 768)
        }

        window.addEventListener("resize", updateWindowDimensions)

        return () => {
            window.removeEventListener("resize", updateWindowDimensions)
        }
    }, [])
    return { ...windowDimensions, isMobile, tabHeight }
}

export default useWindowDimensions
