import { useContext } from "react"
import FileContext from "../../context/FileContext"
import Editor from "./Editor"

function EditorComponent() {
    const { currentFile } = useContext(FileContext)

    return (
        <div className="tab-height flex-grow overflow-x-hidden">
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
