import {
    File,
    FileContent,
    FileContext as FileContextType,
    FileId,
    FileName,
} from "@/types/file"
import { MessageEvent } from "@/types/socket"
import { RemoteUser } from "@/types/user"
import initialFile from "@/utils/initialFile"
import { saveAs } from "file-saver"
import JSZip from "jszip"
import langMap from "lang-map"
import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"
import { toast } from "react-hot-toast"
import { v4 as uuidv4 } from "uuid"
import { useAppContext } from "./AppContext"
import { useSettings } from "./SettingContext"
import { useSocket } from "./SocketContext"

const FileContext = createContext<FileContextType | null>(null)

export const useFileStore = (): FileContextType => {
    const context = useContext(FileContext)
    if (!context) {
        throw new Error("useFileStore must be used within FileContextProvider")
    }
    return context
}

function FileContextProvider({ children }: { children: ReactNode }) {
    const { socket } = useSocket()
    const { setUsers, drawingData } = useAppContext()
    const { setLanguage } = useSettings()

    const [files, setFiles] = useState<File[]>([initialFile])
    const [currentFile, setCurrentFile] = useState<File | null>(initialFile)

    const createFile = (name: FileName) => {
        // Check if file with same name already exists
        let num = 1
        let fileExists = files.some((file) => file.name === name)

        while (fileExists) {
            name = `${name} (${num++})`
            fileExists = files.some((file) => file.name === name)
            if (!fileExists) break
        }

        const id = uuidv4()
        const file = {
            id,
            name,
            content: "",
        }
        setFiles((prev) => [...prev, file])

        // File created event sent to server
        socket.emit(MessageEvent.FILE_CREATED, { file })
        return id
    }

    const updateFile = (id: FileId, content: FileContent) => {
        setFiles((prev) =>
            prev.map((file) => {
                if (file.id === id) {
                    file.content = content
                }
                return file
            }),
        )
        // File updated event sent to server
    }

    const openFile = (id: FileId) => {
        // Save current file
        if (currentFile) {
            updateFile(currentFile.id, currentFile.content)
        }
        const file = files.find((file) => file.id === id)
        if (!file) return toast.error("File cannot be opened")
        setCurrentFile(file)
    }

    const renameFile = (id: FileId, newName: FileName) => {
        // Check if file with same name already exists
        const fileExists = files.some((file) => file.name === newName)

        if (fileExists) {
            return false
        }

        setFiles((prev) =>
            prev.map((file) => {
                if (file.id === id) {
                    file.name = newName
                }
                return file
            }),
        )

        // File renamed event sent to server
        const file = { id, name: newName }
        socket.emit(MessageEvent.FILE_RENAMED, { file })

        return true
    }

    const deleteFile = (id: FileId) => {
        setFiles((prev) => prev.filter((file) => file.id !== id))
        if (currentFile && currentFile.id === id) {
            setCurrentFile(null)
        }
        // File deleted event sent to server
        socket.emit(MessageEvent.FILE_DELETED, { id })
    }

    const downloadCurrentFile = () => {
        if (!currentFile) return toast.success("Open a file to download")

        const blob = new Blob([currentFile.content], {
            type: "text/plain;charset=utf-8",
        })
        saveAs(blob, currentFile.name)
    }

    const downloadAllFiles = () => {
        const zip = new JSZip()
        files.forEach((file) => {
            const blobFile = new Blob([file.content], {
                type: "text/plain;charset=utf-8",
            })
            zip.file(file.name, blobFile)
        })
        zip.generateAsync({ type: "blob" }).then(function (content) {
            saveAs(content, "Code-Sync-Files.zip")
        })
    }

    const handleUserJoined = useCallback(
        ({ user }: { user: RemoteUser }) => {
            toast.success(`${user.username} joined the room`)
            // send the code and drawing data to the server
            socket.emit(MessageEvent.SYNC_FILES, {
                files,
                currentFile,
                socketId: user.socketId,
            })
            socket.emit(MessageEvent.SYNC_DRAWING, {
                drawingData,
                socketId: user.socketId,
            })

            setUsers((prev) => [...prev, user])
        },
        [currentFile, drawingData, files, setUsers, socket],
    )

    const handleFilesSync = useCallback(
        ({ files, currentFile }: { files: File[]; currentFile: File }) => {
            setFiles(files)
            setCurrentFile(currentFile)
        },
        [],
    )

    const handleFileRenamed = useCallback(({ file }: { file: File }) => {
        setFiles((prev) =>
            prev.map((f) => {
                if (f.id === file.id) {
                    f.name = file.name
                }
                return f
            }),
        )
    }, [])

    const handleFileDeleted = useCallback(
        ({ id }: { id: FileId }) => {
            setFiles((prev) => prev.filter((file) => file.id !== id))
            if (currentFile && currentFile.id === id) {
                setCurrentFile(null)
            }
        },
        [currentFile?.id],
    )

    const handleFileCreated = useCallback(({ file }: { file: File }) => {
        setFiles((prev) => [...prev, file])
    }, [])

    const handleFileUpdated = useCallback(
        ({ file }: { file: File }) => {
            setFiles((prev) =>
                prev.map((f) => {
                    if (f.id === file.id) {
                        f.content = file.content
                    }
                    return f
                }),
            )
            if (currentFile && currentFile.id === file.id) {
                setCurrentFile(file)
            }
        },
        [currentFile?.id],
    )

    useEffect(() => {
        if (currentFile === null) return
        // Get file extension on file open and set language when file is opened
        const extension = currentFile.name.split(".").pop()
        if (!extension) return
        const language = langMap.languages(extension)
        setLanguage(language[0])
    }, [currentFile, setLanguage])

    useEffect(() => {
        socket.once(MessageEvent.SYNC_FILES, handleFilesSync)
        socket.on(MessageEvent.USER_JOINED, handleUserJoined)
        socket.on(MessageEvent.FILE_CREATED, handleFileCreated)
        socket.on(MessageEvent.FILE_UPDATED, handleFileUpdated)
        socket.on(MessageEvent.FILE_RENAMED, handleFileRenamed)
        socket.on(MessageEvent.FILE_DELETED, handleFileDeleted)

        return () => {
            socket.off(MessageEvent.USER_JOINED)
            socket.off(MessageEvent.FILE_CREATED)
            socket.off(MessageEvent.FILE_UPDATED)
            socket.off(MessageEvent.FILE_RENAMED)
            socket.off(MessageEvent.FILE_DELETED)
        }
    }, [
        handleFileCreated,
        handleFileDeleted,
        handleFileRenamed,
        handleFilesSync,
        handleFileUpdated,
        handleUserJoined,
        socket,
    ])

    return (
        <FileContext.Provider
            value={{
                files,
                setFiles,
                currentFile,
                setCurrentFile,
                createFile,
                updateFile,
                openFile,
                renameFile,
                deleteFile,
                downloadCurrentFile,
                downloadAllFiles,
            }}
        >
            {children}
        </FileContext.Provider>
    )
}

export { FileContextProvider }
export default FileContext
