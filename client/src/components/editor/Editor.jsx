import CodeMirror from "@uiw/react-codemirror"
import { useContext } from "react"
import { Context } from "../../context/ContextProvider"
import { editorThemes } from "../../resources/Themes"
import { editorLanguages } from "../../resources/Languages"
import { color } from "@uiw/codemirror-extensions-color"
import { hyperLink } from "@uiw/codemirror-extensions-hyper-link"
import useZoom from "../../hooks/useZoom"

function Editor() {
    const { code, setCode, settings } = useContext(Context)
    const { theme, language, fontSize } = settings

    const onCodeChange = (code) => {
        setCode(code)
    }

    // Zoom in/out on ctrl + scroll
    useZoom()

    return (
        <div className="w-[calc(100%-300px)] flex-grow overflow-x-hidden">
            <CodeMirror
                placeholder="// Write your code here..."
                mode={language.toLowerCase()}
                theme={editorThemes[theme]}
                onChange={onCodeChange}
                value={code}
                extensions={[editorLanguages[language], color, hyperLink]}
                minHeight="100vh"
                maxHeight="100vh"
                maxWidth="100%"
                style={{
                    fontSize: fontSize + "px",
                }}
            />
        </div>
    )
}

export default Editor
