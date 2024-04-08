import { useEffect } from "react"
import useSetting from "./useSetting"

function usePageEvents() {
    const { fontSize, setFontSize } = useSetting()

    useEffect(() => {
        // Prevent user from leaving the page
        const beforeUnloadHandler = (e) => {
            const msg = "Changes you made may not be saved"
            return (e.returnValue = msg)
        }

        window.addEventListener("beforeunload", beforeUnloadHandler)

        return () => {
            window.removeEventListener("beforeunload", beforeUnloadHandler)
        }
    }, [])

    useEffect(() => {
        const handleWheel = (e) => {
            if (e.ctrlKey) {
                // Prevent default browser zoom behavior
                e.preventDefault()
                if (!e.target.closest(".cm-editor")) return
                if (e.deltaY > 0) {
                    setFontSize(Math.max(fontSize - 1, 12))
                } else {
                    setFontSize(Math.min(fontSize + 1, 24))
                }
            }
        }

        window.addEventListener("wheel", handleWheel, { passive: false })

        return () => {
            window.removeEventListener("wheel", handleWheel)
        }
    }, [fontSize, setFontSize])
}

export default usePageEvents
