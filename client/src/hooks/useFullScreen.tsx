import { useEffect } from "react"
import screenfull from "screenfull"

function useFullScreen() {
    function detectMob() {
        const toMatch = [
            /Android/i,
            /webOS/i,
            /iPhone/i,
            /iPad/i,
            /iPod/i,
            /BlackBerry/i,
            /Windows Phone/i,
        ]

        return toMatch.some((toMatchItem) => {
            return navigator.userAgent.match(toMatchItem)
        })
    }
    const isMobile = detectMob()

    useEffect(() => {
        if (!isMobile) return

        if (screenfull.isEnabled) {
            screenfull.request()
        }
    }, [isMobile])
}

export default useFullScreen
