import useAppContext from "@/hooks/useAppContext"
import useFileSystem from "@/hooks/useFileSystem"
import usePageEvents from "@/hooks/usePageEvents"
import useSetting from "@/hooks/useSetting"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { editorLanguages } from "@/resources/Languages"
import { editorThemes } from "@/resources/Themes"
import ACTIONS from "@/utils/actions"
import placeholder from "@/utils/editorPlaceholder"
import { color } from "@uiw/codemirror-extensions-color"
import { hyperLink } from "@uiw/codemirror-extensions-hyper-link"
import CodeMirror from "@uiw/react-codemirror"

function Editor() {
    const { socket, roomId } = useAppContext()
    const { currentFile, setCurrentFile } = useFileSystem()
    const { theme, language, fontSize } = useSetting()
    const { tabHeight } = useWindowDimensions()

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
                height: tabHeight,
            }}
        />
    )
}

export default Editor
