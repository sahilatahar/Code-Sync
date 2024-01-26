import { useContext, useRef, useState } from "react"
import { FileContext } from "../../context/FileContextProvider"
import { MdModeEditOutline, MdDelete } from "react-icons/md"
import { IoIosAdd } from "react-icons/io"
import FileEditor from "./FileEditor"
import PropTypes from "prop-types"

function FileSystem({ hideSidebar }) {
    const filesContentRef = useRef(null)
    const { files, openFile, deleteFile, createFile } = useContext(FileContext)
    const [editingFileId, setEditingFileId] = useState(null)

    const handleRenameFile = (e, id) => {
        e.stopPropagation()
        setEditingFileId(id)
    }

    const handleCreateNewFile = () => {
        const id = createFile("New File")
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
        hideSidebar()
        openFile(id)
    }

    return (
        <>
            <div className="relative py-2">
                Files
                <button
                    className="absolute right-0"
                    onClick={handleCreateNewFile}
                >
                    <IoIosAdd color="white" size={24} />
                </button>
            </div>
            <div
                className="max-h-[70%] overflow-auto pl-6 pr-2"
                onClick={(e) => e.stopPropagation()}
                ref={filesContentRef}
            >
                {files.map((file) => {
                    return editingFileId !== file.id ? (
                        <div
                            className="flex py-2"
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

FileSystem.propTypes = {
    hideSidebar: PropTypes.func.isRequired,
}

export default FileSystem
