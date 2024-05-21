import FileSystem from "@/components/files/FileSystem"
import { useFileStore } from "@/context/FileContext"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { File } from "@/types/file"
import langMap from "lang-map"
import { ChangeEvent, useRef } from "react"
import { BiArchiveIn } from "react-icons/bi"
import { LuDownload } from "react-icons/lu"
import { TbFileUpload } from "react-icons/tb"
import { v4 as uuidv4 } from "uuid"

function FilesTab() {
    const {
        currentFile,
        setCurrentFile,
        updateFile,
        setFiles,
        downloadCurrentFile,
        downloadAllFiles,
    } = useFileStore()
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const { tabHeight } = useWindowDimensions()

    const handleOpenFile = () => {
        fileInputRef.current?.click()
    }

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files || files.length === 0) return
        const selectedFile = files[0]
        const reader = new FileReader()
        reader.onload = (e: ProgressEvent<FileReader>) => {
            const text = e.target?.result
            const file: File = {
                id: uuidv4(),
                name: selectedFile.name,
                content: text as string,
            }

            if (currentFile) {
                // Save current file before opening new file
                updateFile(currentFile.id, currentFile.content)
            }

            setFiles((prev: File[]) => [...prev, file])
            setCurrentFile(file)
        }
        reader.readAsText(selectedFile)
    }

    const allowedFileExtensions = Object.keys(langMap().languages).join(",")

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
                <TbFileUpload className="mr-2" size={24} />
                Open File
            </button>
            <button
                className="flex w-full justify-start rounded-md p-2 transition-all hover:bg-darkHover"
                onClick={downloadCurrentFile}
            >
                <LuDownload className="mr-2" size={22} /> Download File
            </button>
            <button
                className="flex w-full justify-start rounded-md p-2 transition-all hover:bg-darkHover"
                onClick={downloadAllFiles}
            >
                <BiArchiveIn className="mr-2" size={22} /> Download All Files
            </button>
            {/* Input to choose and open file */}
            <input
                type="file"
                hidden
                onChange={onFileChange}
                ref={fileInputRef}
                accept={allowedFileExtensions}
            />
        </div>
    )
}

export default FilesTab
