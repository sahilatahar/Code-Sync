import { useFileStore } from "@/context/FileContext"
import Editor from "./Editor"

function EditorComponent() {
    const { currentFile } = useFileStore()

    if (currentFile === null) {
        return (
            <div className="flex h-full items-center justify-center">
                <h1 className="text-xl text-white">
                    No file is currently open.
                </h1>
            </div>
        )
    }

    return (
        <main>
            
            <Editor />
        </main>
    )
}

export default EditorComponent
