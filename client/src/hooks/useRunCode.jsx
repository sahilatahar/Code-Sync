import RunCodeContext from "@/context/RunCodeContext"
import { useContext } from "react"

export const useRunCode = () => {
    const context = useContext(RunCodeContext)
    if (!context) {
        throw new Error("useRunCode must be used within a RunCodeContext")
    }
    return context
}
