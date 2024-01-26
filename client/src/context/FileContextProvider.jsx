import { createContext } from "react"
import useFileSystem from "../hooks/useFileSystem"
import PropTypes from "prop-types"

export const FileContext = createContext()

function FileContextProvider({ children }) {
    const fileSystem = useFileSystem()

    return (
        <FileContext.Provider value={fileSystem}>
            {children}
        </FileContext.Provider>
    )
}

FileContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default FileContextProvider
