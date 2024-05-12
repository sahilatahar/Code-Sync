import TabContext from "@/context/TabContext"
import { useContext } from "react"

function useTab() {
    const context = useContext(TabContext)
    if (context === undefined) {
        throw new Error("useTab must be used within a TabProvider")
    }
    return context
}

export default useTab
