import { useEffect, useContext } from "react"
import useLocalStorage from "./useLocalStorage"
import { Context } from "../context/ContextProvider"

function useZoom() {
    const { settings, updateSettings } = useContext(Context)
    const { fontSize } = settings
    const { setItem } = useLocalStorage()

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

export default useZoom
