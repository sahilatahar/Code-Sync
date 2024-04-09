import SplitterComponent from "@/components/SplitterComponent"
import ConnectionStatusPage from "@/components/connection/ConnectionStatusPage"
import EditorComponent from "@/components/editor/EditorComponent"
import Sidebar from "@/components/sidebar/Sidebar"
import useAppContext from "@/hooks/useAppContext"
import useFullScreen from "@/hooks/useFullScreen"
import useSocket from "@/hooks/useSocket"
import useUserActivity from "@/hooks/useUserActivity"
import ACTIONS from "@/utils/actions"
import UserStatus from "@/utils/status"
import { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"

function EditorPage() {
    // Listen user online/offline status
    useUserActivity()
    // Enable fullscreen mode
    useFullScreen()
    const navigate = useNavigate()
    const { roomId } = useParams()
    const { status, setCurrentUser, currentUser } = useAppContext()
    const { socket } = useSocket()
    const location = useLocation()

    useEffect(() => {
        if (currentUser.username.length > 0) return
        const username = location.state?.username
        if (username === undefined) {
            navigate("/", {
                state: { roomId },
            })
        } else {
            const user = { username, roomId }
            setCurrentUser(user)
            socket.emit(ACTIONS.JOIN_REQUEST, user)
        }
    }, [
        currentUser.username,
        location.state?.username,
        navigate,
        roomId,
        setCurrentUser,
        socket,
    ])

    if (status === UserStatus.CONNECTION_FAILED) {
        return <ConnectionStatusPage />
    }

    return (
        <SplitterComponent>
            <Sidebar />
            <EditorComponent />
        </SplitterComponent>
    )
}

export default EditorPage
