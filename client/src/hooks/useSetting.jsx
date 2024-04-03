import SettingContext from "@/context/SettingContext"
import { useContext } from "react"

function useSetting() {
    return useContext(SettingContext)
}

export default useSetting
