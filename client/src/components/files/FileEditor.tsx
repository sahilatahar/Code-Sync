import { useFileStore } from "@/context/FileContext"
import { FileName } from "@/types/file"
import { ChangeEvent, FormEvent, useState } from "react"
import toast from "react-hot-toast"
import { FaCheck } from "react-icons/fa6"
import { IoClose } from "react-icons/io5"

interface FileEditorProps {
    editingFileId: string
    setEditingFileId: (id: string | null) => void
    name: string
}

function FileEditor({
    editingFileId,
    setEditingFileId,
    name,
}: FileEditorProps) {
    const [fileName, setFileName] = useState<FileName>(name || "")
    const { renameFile, openFile } = useFileStore()

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value)
    }

    const handleConfirm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (fileName === "") {
            toast.error("File name cannot be empty")
        } else if (fileName.length > 25) {
            toast.error("File name cannot be longer than 25 characters")
        } else if (fileName === name) {
            toast.error("File name cannot be the same as before")
        } else {
            const isRenamed = renameFile(editingFileId, fileName)
            openFile(editingFileId)
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
        <div className="rounded-md">
            <form
                onSubmit={handleConfirm}
                className="mb-2 flex w-full gap-4 rounded-md bg-darkHover p-2"
            >
                <input
                    type="text"
                    className="w-[80%] flex-grow rounded-sm bg-white px-2 text-base text-black outline-none"
                    autoFocus
                    value={fileName}
                    onChange={handleOnChange}
                />
                <span className="flex gap-4">
                    <button type="submit">
                        <FaCheck size={18} />
                    </button>
                    <button onClick={handleCancel} type="reset">
                        <IoClose size={22} />
                    </button>
                </span>
            </form>
        </div>
    )
}

export default FileEditor
