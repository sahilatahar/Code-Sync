import useFileSystem from "@/hooks/useFileSystem"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import Editor from "./Editor"

function EditorComponent() {
    const { currentFile } = useFileSystem()
    const { tabHeight } = useWindowDimensions()

    return (
        <div
            className="absolute left-0 top-0 w-full max-w-full flex-grow overflow-x-hidden md:static"
            style={{ height: tabHeight }}
        >
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
