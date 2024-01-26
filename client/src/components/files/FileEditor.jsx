import { useState, useContext } from "react"
import { FaCheck } from "react-icons/fa6"
import { IoClose } from "react-icons/io5"
import PropTypes from "prop-types"
import toast from "react-hot-toast"
import { FileContext } from "../../context/FileContextProvider"

function FileEditor({ editingFileId, setEditingFileId, name }) {
    const [fileName, setFileName] = useState(name || "")
    const { renameFile } = useContext(FileContext)

    const handleOnChange = (e) => {
        setFileName(e.target.value)
    }

    const handleConfirm = () => {
        if (fileName === "") {
            toast.error("File name cannot be empty")
        } else if (fileName.length > 25) {
            toast.error("File name cannot be longer than 25 characters")
        } else if (fileName === name) {
            toast.error("File name cannot be the same as before")
        } else {
            const isRenamed = renameFile(editingFileId, fileName)
            if (!isRenamed) {
                toast.error("File with same name already exists")
            } else {
                setEditingFileId(null)
            }
        }
    }

    const handleCancel = () => {
        setEditingFileId(null)
    }

    return (
        <div className="flex gap-4">
            <input
                type="text"
                className="w-[80%] flex-grow bg-white px-2 py-1 text-black"
                autoFocus
                value={fileName}
                onChange={handleOnChange}
            />
            <span className="flex gap-4">
                <button onClick={handleConfirm}>
                    <FaCheck size={16} />
                </button>
                <button onClick={handleCancel}>
                    <IoClose size={20} />
                </button>
            </span>
        </div>
    )
}

FileEditor.propTypes = {
    editingFileId: PropTypes.string.isRequired,
    setEditingFileId: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
}

export default FileEditor
