import { useContext } from "react"
import AppContext from "@/context/AppContext"

const useAppContext = () => {
    return useContext(AppContext)
}

export default useAppContext
