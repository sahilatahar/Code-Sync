import PropTypes from "prop-types"
import { createContext, useState } from "react"
import socketStatus from "../utils/socketStatus"
const AppContext = createContext()

function AppContextProvider({ children }) {
    const [socket, setSocket] = useState(null)
    const [clients, setClients] = useState([])
    const [roomId, setRoomId] = useState("")
    const [username, setUsername] = useState("")
    const [status, setStatus] = useState(socketStatus.CONNECTING)

    return (
        <AppContext.Provider
            value={{
                socket,
                setSocket,
                clients,
                setClients,
                roomId,
                setRoomId,
                username,
                setUsername,
                status,
                setStatus,
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
