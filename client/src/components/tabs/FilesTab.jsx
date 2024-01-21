import { useContext, useRef } from "react"
import { Context } from "../../context/ContextProvider"
import {
    fileExtensionsArray as AllowedFileTypes,
    getFileExtension,
    getLanguageName,
} from "../../resources/Languages"
import { saveAs } from "file-saver"

function FilesTab() {
    const { code, setCode, settings, updateSettings } = useContext(Context)
    const { language } = settings
    const fileInputRef = useRef(null)

    const handleOpenFile = () => {
        fileInputRef.current.click()
    }

    const handleSaveFile = () => {
        let filename = "code.txt"
        const extension = getFileExtension(language)
        if (extension != null) {
            filename = `code${extension}`
        }
        const blob = new Blob([code], { type: "text/plain;charset=utf-8" })
        saveAs(blob, filename)
    }

    const onFileChange = (e) => {
        const file = e.target.files[0]
        // Get file extension on file open and set language
        const language = getLanguageName(file.name)
        if (language != null) {
            updateSettings((prev) => ({ ...prev, language }))
        }
        const reader = new FileReader()
        reader.onload = (e) => {
            const text = e.target.result
            setCode(text)
        }
        reader.readAsText(file)
    }

    return (
        <div className="flex flex-col gap-1">
            <input
                type="file"
                hidden
                onChange={onFileChange}
                ref={fileInputRef}
                accept={AllowedFileTypes.join(",")}
            />
            <button
                className="flex w-full justify-start py-2 transition-all hover:rounded-md hover:bg-darkHover hover:px-4"
                onClick={handleOpenFile}
            >
                Open File
            </button>
            <button
                className="flex w-full justify-start py-2 transition-all hover:rounded-md hover:bg-darkHover hover:px-4"
                onClick={handleSaveFile}
            >
                Save
            </button>
        </div>
    )
}

export default FilesTab
