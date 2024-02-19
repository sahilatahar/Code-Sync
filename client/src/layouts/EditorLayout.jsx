import Loading from "../components/loading/Loading"
import useSocket from "../socket/useSocket"
import EditorPage from "../pages/EditorPage"
import socketStatus from "../utils/socketStatus"

function EditorLayout() {
    const { status } = useSocket()

    return status !== socketStatus.CONNECTED ? (
        <Loading status={status} />
    ) : (
        <EditorPage />
    )
}

export default EditorLayout
