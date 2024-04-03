import FileSystem from "@/components/files/FileSystem"
import useFileSystem from "@/hooks/useFileSystem"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { fileExtensionsArray as AllowedFileTypes } from "@/resources/Languages"
import { ArchiveBox, DownloadSimple, FileArrowUp } from "@phosphor-icons/react"
import { useRef } from "react"
import { v4 as uuidv4 } from "uuid"

function FilesTab() {
    const {
        currentFile,
        setCurrentFile,
        updateFile,
        setFiles,
        downloadCurrentFile,
        downloadAllFiles,
    } = useFileSystem()
    const fileInputRef = useRef(null)
    const { tabHeight } = useWindowDimensions()

    const handleOpenFile = () => {
        fileInputRef.current.click()
    }
    const onFileChange = (e) => {
        const selectedFile = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            const text = e.target.result
            const file = {
                id: uuidv4(),
                name: selectedFile.name,
                content: text,
            }
            // Save current file before opening new file
            updateFile(currentFile.id, currentFile.content)

            setFiles((prev) => [...prev, file])
            setCurrentFile(file)
        }
        reader.readAsText(selectedFile)
    }

    return (
        <div
            className="flex select-none flex-col gap-1 p-4"
            style={{ height: tabHeight }}
        >
            <FileSystem />
            <button
                className="flex w-full justify-start rounded-md p-2 transition-all hover:bg-darkHover"
                onClick={handleOpenFile}
            >
                <FileArrowUp className="mr-2" size={22} />
                Open File
            </button>
            <button
                className="flex w-full justify-start rounded-md p-2 transition-all hover:bg-darkHover"
                onClick={downloadCurrentFile}
            >
                <DownloadSimple className="mr-2" size={22} /> Download File
            </button>
            <button
                className="flex w-full justify-start rounded-md p-2 transition-all hover:bg-darkHover"
                onClick={downloadAllFiles}
            >
                <ArchiveBox className="mr-2" size={22} /> Download All Files
            </button>
            {/* Input to choose and open file */}
            <input
                type="file"
                hidden
                onChange={onFileChange}
                ref={fileInputRef}
                accept={AllowedFileTypes.join(",")}
            />
        </div>
    )
}

export default FilesTab
