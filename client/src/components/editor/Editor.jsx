import CodeMirror from "@uiw/react-codemirror"
import { useContext } from "react"
import { Context } from "../../context/ContextProvider"
import { editorThemes } from "../../resources/Themes"
import { editorLanguages } from "../../resources/Languages"
import { color } from "@uiw/codemirror-extensions-color"
import { hyperLink } from "@uiw/codemirror-extensions-hyper-link"
import useZoom from "../../hooks/useZoom"
import { FileContext } from "../../context/FileContextProvider"
import ACTIONS from "../../utils/actions"
import { useParams } from "react-router-dom"

function Editor() {
    const { socket, settings } = useContext(Context)
    const { currentFile, setCurrentFile } = useContext(FileContext)
    const { theme, language, fontSize } = settings
    const { roomId } = useParams()

    const onCodeChange = (code) => {
        const file = { ...currentFile, content: code }
        setCurrentFile(file)
        socket.emit(ACTIONS.FILE_UPDATED, { file, roomId })
    }

    // Zoom in/out on ctrl + scroll
    useZoom()

    return (
        <CodeMirror
            placeholder="// Write your code here..."
            mode={language.toLowerCase()}
            theme={editorThemes[theme]}
            onChange={onCodeChange}
            value={currentFile.content}
            extensions={[editorLanguages[language], color, hyperLink]}
            minHeight="100vh"
            maxHeight="100vh"
            maxWidth="100%"
            style={{
                fontSize: fontSize + "px",
            }}
        />
    )
}

export default Editor
