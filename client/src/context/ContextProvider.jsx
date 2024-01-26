import { createContext, useState } from "react"
import PropTypes from "prop-types"
import TABS from "../utils/tabs"
export const Context = createContext()
import useLocalStorage from "../hooks/useLocalStorage"

export default function ContextProvider({ children }) {
    const { getItem } = useLocalStorage()
    // First letter of each value should be capital
    const storedSettings = JSON.parse(getItem("settings")) || {}
    storedSettings.theme = storedSettings.theme || "Dracula"
    storedSettings.language = storedSettings.language || "Javascript"
    storedSettings.fontSize = storedSettings.fontSize || 16
    storedSettings.fontFamily = storedSettings.fontFamily || "Space Mono"
    storedSettings.lastOpenTab = storedSettings.lastOpenTab || TABS.HOME

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
