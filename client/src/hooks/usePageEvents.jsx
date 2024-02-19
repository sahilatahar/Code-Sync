import { useContext, useEffect } from "react"
import AppContext from "../context/AppContext"
import useLocalStorage from "./useLocalStorage"

function usePageEvents() {
    const { settings, updateSettings } = useContext(AppContext)
    const { fontSize } = settings
    const { setItem } = useLocalStorage()

    useEffect(() => {
        // Prevent client from leaving the page
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
                    updateSettings((prev) => ({
                        ...prev,
                        fontSize: Math.max(fontSize - 1, 12),
                    }))
                } else {
                    updateSettings((prev) => ({
                        ...prev,
                        fontSize: Math.min(fontSize + 1, 24),
                    }))
                }
                setItem("settings", JSON.stringify({ ...settings, fontSize }))
            }
        }

        window.addEventListener("wheel", handleWheel, { passive: false })

        return () => {
            window.removeEventListener("wheel", handleWheel)
        }
    }, [fontSize, settings, setItem, updateSettings])
}

export default usePageEvents
