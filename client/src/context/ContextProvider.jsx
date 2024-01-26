import { createContext, useState } from "react"
import PropTypes from "prop-types"
export const Context = createContext()

export default function ContextProvider({ children }) {
    // First letter of each value should be capital
    const storedSettings = JSON.parse(localStorage.getItem("settings")) || {}
    storedSettings.theme = storedSettings.theme || "Dracula"
    storedSettings.language = storedSettings.language || "Javascript"
    storedSettings.fontSize = storedSettings.fontSize || 16
    storedSettings.fontFamily = storedSettings.fontFamily || "Space Mono"

    const [socket, setSocket] = useState(null)
    const [clients, setClients] = useState([])
    const [settings, updateSettings] = useState(storedSettings)

    return (
        <Context.Provider
            value={{
                socket,
                setSocket,
                clients,
                setClients,
                settings,
                updateSettings,
            }}
        >
            {children}
        </Context.Provider>
    )
}

ContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
