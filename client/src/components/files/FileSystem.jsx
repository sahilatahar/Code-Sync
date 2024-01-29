import { useContext, useRef, useState } from "react"
import { IoIosAdd } from "react-icons/io"
import { MdDelete, MdModeEditOutline } from "react-icons/md"
import FileContext from "../../context/FileContext"
import FileEditor from "./FileEditor"
import TabContext from "../../context/TabContext"
import useWindowDimensions from "../../hooks/useWindowDimensions"

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
            <div className="relative pb-2">
                Files
                <button
                    className="absolute right-0"
                    onClick={handleCreateNewFile}
                    title="Create new file"
                >
                    <IoIosAdd color="white" size={24} />
                </button>
            </div>
            <div
                className="max-h-[70%] min-h-[200px] overflow-auto pl-4 pr-2 sm:min-h-0"
                onClick={(e) => e.stopPropagation()}
                ref={filesContentRef}
            >
                {files.map((file) => {
                    return editingFileId !== file.id ? (
                        <div
                            className={
                                "mb-2 flex rounded-md px-4 py-2 hover:bg-darkHover " +
                                fileSelectedClass(file.id)
                            }
                            key={file.id}
                            onClick={() => handleFileClick(file.id)}
                        >
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
        </>
    )
}

export default FileSystem
