import { useAppContext } from "@/context/AppContext"
import { useFileStore } from "@/context/FileContext"
import { useSettings } from "@/context/SettingContext"
import { useSocket } from "@/context/SocketContext"
import usePageEvents from "@/hooks/usePageEvents"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { editorThemes } from "@/resources/Themes"
import { File } from "@/types/file"
import { MessageEvent } from "@/types/socket"
import placeholder from "@/utils/editorPlaceholder"
import { color } from "@uiw/codemirror-extensions-color"
import { hyperLink } from "@uiw/codemirror-extensions-hyper-link"
import { LanguageName, loadLanguage } from "@uiw/codemirror-extensions-langs"
import CodeMirror, { ViewUpdate } from "@uiw/react-codemirror"
import { useState } from "react"
import toast from "react-hot-toast"
import { cursorTooltipBaseTheme, tooltipField } from "./tooltip"

function Editor() {
    const { users, currentUser } = useAppContext()
    const { currentFile, setCurrentFile } = useFileStore()
    const { theme, language, fontSize } = useSettings()
    const { socket } = useSocket()
    const { tabHeight } = useWindowDimensions()
    const [timeOut, setTimeOut] = useState(setTimeout(() => {}, 0))
    const filteredUsers = users.filter(
        (u) => u.username !== currentUser.username,
    )

    const onCodeChange = (code: string, view: ViewUpdate) => {
        if (!currentFile) return

        const file: File = { ...currentFile, content: code }
        setCurrentFile(file)
        socket.emit(MessageEvent.FILE_UPDATED, { file })
        const cursorPosition = view.state?.selection?.main?.head
        socket.emit(MessageEvent.TYPING_START, { cursorPosition })

        clearTimeout(timeOut)

        const newTimeOut = setTimeout(
            () => socket.emit(MessageEvent.TYPING_PAUSE),
            1000,
        )
        setTimeOut(newTimeOut)
    }

    // Listen wheel event to zoom in/out and prevent page reload
    usePageEvents()

    const getExtensions = () => {
        const extensions = [
            color,
            hyperLink,
            tooltipField(filteredUsers),
            cursorTooltipBaseTheme,
        ]
        const langExt = loadLanguage(language.toLowerCase() as LanguageName)
        if (langExt) {
            extensions.push(langExt)
        } else {
            toast.error("Syntax Highlighting not available for this language")
        }
        return extensions
    }

    return (
        <CodeMirror
            placeholder={placeholder(currentFile?.name || "")}
            theme={editorThemes[theme]}
            onChange={onCodeChange}
            value={currentFile?.content}
            extensions={getExtensions()}
            minHeight="100%"
            maxWidth="100vw"
            style={{
                fontSize: fontSize + "px",
                height: tabHeight,
                position: "relative",
            }}
        />
    )
}

export default Editor
