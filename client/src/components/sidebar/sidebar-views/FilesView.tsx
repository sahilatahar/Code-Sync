import FileStructureView from "@/components/files/FileStructureView"
import { useFileSystem } from "@/context/FileContext"
import useResponsive from "@/hooks/useResponsive"
import { FileSystemItem } from "@/types/file"
import cn from "classnames"
import { BiArchiveIn } from "react-icons/bi"
import { TbFileUpload } from "react-icons/tb"
import { v4 as uuidV4 } from "uuid"
import { toast } from "react-hot-toast"

function FilesView() {
    const { downloadFilesAndFolders, updateDirectory } = useFileSystem()
    const { viewHeight } = useResponsive()
    const { minHeightReached } = useResponsive()

    const handleOpenDirectory = async () => {
        if ("showDirectoryPicker" in window) {
            try {
                const directoryHandle = await window.showDirectoryPicker()
                toast.loading("Getting files and folders...")
                const structure = await readDirectory(directoryHandle)
                updateDirectory("", structure)
            } catch (error) {
                console.error("Error opening directory:", error)
            }
        } else {
            alert(
                "The File System Access API is not supported in this browser.",
            )
        }
    }

    const readDirectory = async (
        directoryHandle: FileSystemDirectoryHandle,
    ): Promise<FileSystemItem[]> => {
        const children: FileSystemItem[] = []
        const blackList = ["node_modules", ".git", ".vscode", ".next"]

        for await (const entry of directoryHandle.values()) {
            if (entry.kind === "file") {
                const file = await entry.getFile()
                const newFile: FileSystemItem = {
                    id: uuidV4(),
                    name: entry.name,
                    type: "file",
                    content: await file.text(),
                }
                children.push(newFile)
            } else if (entry.kind === "directory") {
                if (blackList.includes(entry.name)) continue

                const newDirectory: FileSystemItem = {
                    id: uuidV4(),
                    name: entry.name,
                    type: "directory",
                    children: await readDirectory(entry),
                    isOpen: false,
                }
                children.push(newDirectory)
            }
        }
        return children
    }

    return (
        <div
            className="flex select-none flex-col gap-1 px-4 py-2"
            style={{ height: viewHeight, maxHeight: viewHeight }}
        >
            <FileStructureView />
            <div
                className={cn(`flex min-h-fit flex-col justify-end pt-2`, {
                    hidden: minHeightReached,
                })}
            >
                <hr />
                <button
                    className="mt-2 flex w-full justify-start rounded-md p-2 transition-all hover:bg-darkHover"
                    onClick={handleOpenDirectory}
                >
                    <TbFileUpload className="mr-2" size={24} />
                    Open File/Folder
                </button>
                <button
                    className="flex w-full justify-start rounded-md p-2 transition-all hover:bg-darkHover"
                    onClick={downloadFilesAndFolders}
                >
                    <BiArchiveIn className="mr-2" size={22} /> Download Code
                </button>
            </div>
        </div>
    )
}

export default FilesView
