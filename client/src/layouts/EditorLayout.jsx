import useSocket from "../hooks/useSocket"
import EditorPage from "../pages/EditorPage"
import Loading from "../components/loading/Loading"

function EditorLayout() {
    const { isLoading, isError } = useSocket()

    return isLoading ? <Loading isError={isError} /> : <EditorPage />
}

export default EditorLayout
