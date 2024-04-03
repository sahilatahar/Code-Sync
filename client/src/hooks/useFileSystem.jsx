import FileContext from "@/context/FileContext"
import { useContext } from "react"

function useFileSystem() {
    return useContext(FileContext)
}

export default useFileSystem
