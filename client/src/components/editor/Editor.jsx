import { color } from "@uiw/codemirror-extensions-color"
import { hyperLink } from "@uiw/codemirror-extensions-hyper-link"
import CodeMirror from "@uiw/react-codemirror"
import { useContext } from "react"
import AppContext from "../../context/AppContext"
import FileContext from "../../context/FileContext"
import usePageEvents from "../../hooks/usePageEvents"
import { editorLanguages } from "../../resources/Languages"
import { editorThemes } from "../../resources/Themes"
import ACTIONS from "../../utils/actions"
import placeholder from "../../utils/editorPlaceholder"

function Editor() {
    const { socket, settings, roomId } = useContext(AppContext)
    const { currentFile, setCurrentFile } = useContext(FileContext)
    const { theme, language, fontSize } = settings

    const onCodeChange = (code) => {
        const file = { ...currentFile, content: code }
        setCurrentFile(file)
        socket.emit(ACTIONS.FILE_UPDATED, { file, roomId })
    }

    // Listen wheel event to zoom in/out and prevent page reload
    usePageEvents()

    return (
        <CodeMirror
            placeholder={placeholder(currentFile.name)}
            mode={language.toLowerCase()}
            theme={editorThemes[theme]}
            onChange={onCodeChange}
            value={currentFile.content}
            extensions={[editorLanguages[language], color, hyperLink]}
            minHeight="100%"
            maxWidth="100vw"
            style={{
                fontSize: fontSize + "px",
            }}
            className="tab-height"
        />
    )
}

export default Editor
