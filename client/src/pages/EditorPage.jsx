import SplitterComponent from "@/components/SplitterComponent"
import EditorComponent from "@/components/editor/EditorComponent"
import Loading from "@/components/loading/Loading"
import Sidebar from "@/components/sidebar/Sidebar"
import useAppContext from "@/hooks/useAppContext"
import useClientActivity from "@/hooks/useClientActivity"
import useFullScreen from "@/hooks/useFullScreen"
import useSocket from "@/hooks/useSocket"
import socketStatus from "@/utils/socketStatus"

function EditorPage() {
    // Listen client online/offline status
    useClientActivity()
    // Initialize socket connection
    useSocket()
    // Enable fullscreen mode
    useFullScreen()

    const { status } = useAppContext()

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
