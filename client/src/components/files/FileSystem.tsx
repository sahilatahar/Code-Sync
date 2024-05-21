import { useFileStore } from "@/context/FileContext"
import { useTabs } from "@/context/TabContext"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { FileId, FileName } from "@/types/file"
import { getIconClassName } from "@/utils/getIconClassName"
import { Icon } from "@iconify/react"
import { MouseEvent, useRef, useState } from "react"
import { MdDelete } from "react-icons/md"
import { PiPencilSimpleFill } from "react-icons/pi"
import FileEditor from "./FileEditor"
import { ACTIVITY_STATE } from "@/types/app"
import { useAppContext } from "@/context/AppContext"

function FileSystem() {
    const { files, currentFile, openFile, deleteFile, createFile } =
        useFileStore()
    const { setIsSidebarOpen } = useTabs()
    const { isMobile } = useWindowDimensions()
    const { activityState, setActivityState } = useAppContext()

    const filesContentRef = useRef<HTMLDivElement | null>(null)
    const [editingFileId, setEditingFileId] = useState<FileId | null>(null)

    const handleRenameFile = (e: MouseEvent<HTMLButtonElement>, id: FileId) => {
        e.stopPropagation()
        setEditingFileId(id)
    }

    const handleCreateNewFile = () => {
        const id = createFile("Untitled")
        setEditingFileId(id)
    }

    const handleDeleteFile = (
        e: MouseEvent<HTMLButtonElement>,
        id: FileId,
        name: FileName,
    ) => {
        e.stopPropagation()
        const isConfirmed = confirm(
            `Are you sure you want to delete ${name} file?`,
        )
        if (isConfirmed) {
            deleteFile(id)
        }
    }

    const handleFileClick = (id: FileId) => {
        setEditingFileId(null)
        openFile(id)
        if (isMobile) {
            setIsSidebarOpen(false)
        }
        if (activityState === ACTIVITY_STATE.DRAWING) {
            setActivityState(ACTIVITY_STATE.CODING)
        }
    }

    const fileSelectedClass = (id: FileId) => {
        if (currentFile && currentFile.id === id) {
            return "bg-darkHover"
        }
        return ""
    }

    return (
        <>
            <div className="pb-2">
                <h1 className="text-lg">Files ({files.length})</h1>
            </div>
            <div
                className="max-h-[70%] min-h-[200px] flex-grow overflow-auto pl-4 pr-2 sm:min-h-0"
                onClick={(e) => e.stopPropagation()}
                ref={filesContentRef}
            >
                {files.map((file) => {
                    return editingFileId !== file.id ? (
                        <div
                            className={
                                "mb-2 flex rounded-md p-2 hover:bg-darkHover " +
                                fileSelectedClass(file.id)
                            }
                            key={file.id}
                            onClick={() => handleFileClick(file.id)}
                        >
                            <Icon
                                icon={getIconClassName(file.name)}
                                fontSize={24}
                                className="mr-2"
                            />
                            <p
                                className="line-clamp-1 flex-grow cursor-pointer"
                                title={file.name}
                            >
                                {file.name}
                            </p>
                            <span className="flex gap-4">
                                <button
                                    onClick={(e) =>
                                        handleRenameFile(e, file.id)
                                    }
                                >
                                    <PiPencilSimpleFill size={18} />
                                </button>
                                <button
                                    onClick={(e) =>
                                        handleDeleteFile(e, file.id, file.name)
                                    }
                                    className="text-danger"
                                >
                                    <MdDelete size={20} />
                                </button>
                            </span>
                        </div>
                    ) : (
                        <FileEditor
                            key={file.id}
                            editingFileId={editingFileId}
                            setEditingFileId={setEditingFileId}
                            name={file.name}
                        />
                    )
                })}
            </div>
            <button
                className="my-2 flex w-full justify-center rounded-md bg-primary p-2 font-bold text-black transition-all"
                onClick={handleCreateNewFile}
            >
                New File
            </button>
        </>
    )
}

export default FileSystem
