import { useContext, useRef, useState } from "react"
import { LuFiles } from "react-icons/lu"
import { MdDelete, MdModeEditOutline } from "react-icons/md"
import FileContext from "../../context/FileContext"
import FileEditor from "./FileEditor"
import TabContext from "../../context/TabContext"
import useWindowDimensions from "../../hooks/useWindowDimensions"
import { Icon } from "@iconify/react"
import { getIconClassName } from "../../utils/getIconClassName"

function FileSystem() {
    const filesContentRef = useRef(null)
    const { files, currentFile, openFile, deleteFile, createFile } =
        useContext(FileContext)
    const [editingFileId, setEditingFileId] = useState(null)
    const { setIsSidebarOpen } = useContext(TabContext)
    const { isMobile } = useWindowDimensions()

    const handleRenameFile = (e, id) => {
        e.stopPropagation()
        setEditingFileId(id)
    }

    const handleCreateNewFile = () => {
        const id = createFile("Untitled")
        setEditingFileId(id)
    }

    const handleDeleteFile = (e, id, name) => {
        e.stopPropagation()
        const isConfirmed = confirm(
            `Are you sure you want to delete ${name} file?`,
        )
        if (isConfirmed) {
            deleteFile(id)
        }
    }

    const handleFileClick = (id) => {
        setEditingFileId(null)
        openFile(id)
        if (isMobile) {
            setIsSidebarOpen(false)
        }
    }

    const fileSelectedClass = (id) => {
        if (currentFile !== null && currentFile.id === id) {
            return "bg-darkHover"
        }
        return ""
    }

    return (
        <>
            <div className="flex items-center pb-2">
                <LuFiles size={32} className="mr-2" />
                <div>
                    <h1 className="text-lg font-semibold">Files</h1>
                    <p className="text-sm text-gray-400">
                        {files.length} files in total
                    </p>
                </div>
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
                                    <MdModeEditOutline size={16} />
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
