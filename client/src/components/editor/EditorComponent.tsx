import { useFileSystem } from "@/context/FileContext"
import Editor from "./Editor"
import FileTab from "./FileTab"

function EditorComponent() {
    const { openFiles } = useFileSystem()

    if (openFiles.length <= 0) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <h1 className="text-xl text-white">
                    No file is currently open.
                </h1>
            </div>
        )
    }

    return (
        <main className="flex h-screen w-full flex-col overflow-x-auto">
            <FileTab />
            <Editor />
        </main>
    )
}

export default EditorComponent
