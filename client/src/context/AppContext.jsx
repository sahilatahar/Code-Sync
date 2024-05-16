import STATE from "@/utils/states"
import UserStatus from "@/utils/status"
import PropTypes from "prop-types"
import { createContext, useState } from "react"
const AppContext = createContext()

function AppContextProvider({ children }) {
    const [users, setUsers] = useState([])
    const [status, setStatus] = useState(UserStatus.INITIAL)
    const [currentUser, setCurrentUser] = useState({
        username: "",
        roomId: "",
    })
    // For drawing state
    const [state, setState] = useState(STATE.CODING)
    const [drawingData, setDrawingData] = useState(null)

    return (
        <AppContext.Provider
            value={{
                users,
                setUsers,
                currentUser,
                setCurrentUser,
                status,
                setStatus,
                state,
                setState,
                drawingData,
                setDrawingData,
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
