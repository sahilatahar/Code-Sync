import SplitterComponent from "../components/SplitterComponent"
import Sidebar from "../components/sidebar/Sidebar"
import useClientActivity from "../hooks/useClientActivity"
import useSocket from "../hooks/useSocket"
import socketStatus from "../utils/socketStatus"
import Loading from "../components/loading/Loading"
import { useContext } from "react"
import AppContext from "../context/AppContext"
import EditorComponent from "../components/editor/EditorComponent"
import useFullScreen from "../hooks/useFullScreen"

function EditorPage() {
    // Listen client online/offline status
    useClientActivity()
    // Initialize socket connection
    useSocket()
    // Enable fullscreen mode
    useFullScreen()

    const { status } = useContext(AppContext)

    if (!(status === socketStatus.CONNECTED)) {
        return <Loading status={status} />
    }

    return (
        <SplitterComponent>
            <Sidebar />
            <EditorComponent />
        </SplitterComponent>
    )
}

export default EditorPage
