import useSocket from "../hooks/useSocket"
import EditorPage from "../pages/EditorPage"
import Loading from "../components/loading/Loading"
import FileContextProvider from "../context/FileContextProvider"

function EditorLayout() {
    const { isLoading, isError } = useSocket()

    return isLoading ? (
        <Loading isError={isError} />
    ) : (
        <FileContextProvider>
            <EditorPage />
        </FileContextProvider>
    )
}

export default EditorLayout
