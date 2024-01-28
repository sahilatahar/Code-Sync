import PropTypes from "prop-types"
import { createContext, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"
const AppContext = createContext()

function AppContextProvider({ children }) {
    const { getItem } = useLocalStorage()
    // First letter of each value should be capital
    const storedSettings = JSON.parse(getItem("settings")) || {}
    storedSettings.theme = storedSettings.theme || "Dracula"
    storedSettings.language = storedSettings.language || "Javascript"
    storedSettings.fontSize = storedSettings.fontSize || 16
    storedSettings.fontFamily = storedSettings.fontFamily || "Space Mono"

    const [socket, setSocket] = useState(null)
    const [clients, setClients] = useState([])
    const [settings, updateSettings] = useState(storedSettings)
    const [roomId, setRoomId] = useState("")
    const [username, setUsername] = useState("")

    return (
        <AppContext.Provider
            value={{
                socket,
                setSocket,
                clients,
                setClients,
                settings,
                updateSettings,
                roomId,
                setRoomId,
                username,
                setUsername,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { AppContextProvider }
export default AppContext
