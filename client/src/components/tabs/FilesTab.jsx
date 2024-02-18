import { useContext, useRef } from "react"
import { v4 as uuidv4 } from "uuid"
import FileContext from "../../context/FileContext"
import { fileExtensionsArray as AllowedFileTypes } from "../../resources/Languages"
import FileSystem from "../files/FileSystem"
import { FiFile, FiDownload } from "react-icons/fi"

function FilesTab() {
    const {
        currentFile,
        setCurrentFile,
        updateFile,
        setFiles,
        downloadCurrentFile,
        downloadAllFiles,
    } = useContext(FileContext)
    const fileInputRef = useRef(null)

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
        <div className="tab-height flex select-none flex-col gap-1 p-4">
            <FileSystem />
            <button
                className="flex w-full justify-start rounded-md p-2 transition-all hover:bg-darkHover"
                onClick={handleOpenFile}
            >
                <FiFile className="mr-2" size={22} />
                Open File
            </button>
            <button
                className="flex w-full justify-start rounded-md p-2 transition-all hover:bg-darkHover"
                onClick={downloadCurrentFile}
            >
                <FiDownload className="mr-2" size={22} /> Download File
            </button>
            <button
                className="flex w-full justify-start rounded-md p-2 transition-all hover:bg-darkHover"
                onClick={downloadAllFiles}
            >
                <FiDownload className="mr-2" size={22} /> Download All Files
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
