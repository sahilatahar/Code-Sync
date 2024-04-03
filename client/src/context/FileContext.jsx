import PropTypes from "prop-types"
import { createContext } from "react"
import useFileSystemContext from "@/hooks/useFileSystemContext"

const FileContext = createContext()

function FileContextProvider({ children }) {
    const fileSystem = useFileSystemContext()

    return (
        <FileContext.Provider value={fileSystem}>
            {children}
        </FileContext.Provider>
    )
}

FileContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { FileContextProvider }
export default FileContext
