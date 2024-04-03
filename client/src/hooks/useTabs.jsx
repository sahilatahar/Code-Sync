import TabContext from "@/context/TabContext"
import { useContext } from "react"

function useTab() {
    return useContext(TabContext)
}

export default useTab
