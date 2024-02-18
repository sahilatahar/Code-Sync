import { useContext } from "react"
import FileContext from "../../context/FileContext"
import Editor from "./Editor"

function EditorComponent() {
    const { currentFile } = useContext(FileContext)

    return (
        <div className="tab-height absolute left-0 top-0 w-full max-w-full flex-grow overflow-x-hidden md:static">
            {currentFile !== null ? (
                <Editor />
            ) : (
                <div className="flex h-full items-center justify-center">
                    <h1 className="text-xl text-white">
                        No file is currently open.
                    </h1>
                </div>
            )}
        </div>
    )
}

export default EditorComponent
