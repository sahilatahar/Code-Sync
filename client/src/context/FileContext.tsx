import {
    FileContent,
    FileContext as FileContextType,
    FileName,
    FileSystemItem,
    Id,
} from "@/types/file"
import { SocketEvent } from "@/types/socket"
import { RemoteUser } from "@/types/user"
import {
    findParentDirectory,
    getFileById,
    initialFileStructure,
    isFileExist,
} from "@/utils/file"
import { saveAs } from "file-saver"
import JSZip from "jszip"
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
import { useSocket } from "./SocketContext"

const FileContext = createContext<FileContextType | null>(null)

export const useFileSystem = (): FileContextType => {
    const context = useContext(FileContext)
    if (!context) {
        throw new Error("useFileSystem must be used within FileContextProvider")
    }
    return context
}

function FileContextProvider({ children }: { children: ReactNode }) {
    const { socket } = useSocket()
    const { setUsers, drawingData } = useAppContext()

    const [fileStructure, setFileStructure] =
        useState<FileSystemItem>(initialFileStructure)
    const initialOpenFiles = fileStructure.children
        ? fileStructure.children
        : []
    const [openFiles, setOpenFiles] =
        useState<FileSystemItem[]>(initialOpenFiles)
    const [activeFile, setActiveFile] = useState<FileSystemItem | null>(
        openFiles[0],
    )

    // Function to toggle the isOpen property of a directory (Directory Open/Close)
    const toggleDirectory = (dirId: Id) => {
        const toggleDir = (directory: FileSystemItem): FileSystemItem => {
            if (directory.id === dirId) {
                return {
                    ...directory,
                    isOpen: !directory.isOpen,
                }
            } else if (directory.children) {
                return {
                    ...directory,
                    children: directory.children.map(toggleDir),
                }
            } else {
                return directory
            }
        }

        // Update fileStructure with the opened directory
        setFileStructure((prevFileStructure) => toggleDir(prevFileStructure))
    }

    const collapseDirectories = () => {
        const collapseDir = (directory: FileSystemItem): FileSystemItem => {
            return {
                ...directory,
                isOpen: false,
                children: directory.children?.map(collapseDir),
            }
        }

        setFileStructure((prevFileStructure) => collapseDir(prevFileStructure))
    }

    const createDirectory = useCallback(
        (
            parentDirId: string,
            newDir: string | FileSystemItem,
            sendToSocket: boolean = true,
        ) => {
            let newDirectory: FileSystemItem
            if (typeof newDir === "string") {
                newDirectory = {
                    id: uuidv4(),
                    name: newDir,
                    type: "directory",
                    children: [],
                    isOpen: false,
                }
            } else {
                newDirectory = newDir
            }

            if (!parentDirId) parentDirId = fileStructure.id

            const addDirectoryToParent = (
                directory: FileSystemItem,
            ): FileSystemItem => {
                if (directory.id === parentDirId) {
                    // If the current directory matches the parent, add new directory to its children
                    return {
                        ...directory,
                        children: [...(directory.children || []), newDirectory],
                    }
                } else if (directory.children) {
                    // If it's not the parent directory, recursively update children
                    return {
                        ...directory,
                        children: directory.children.map(addDirectoryToParent),
                    }
                } else {
                    // Return the directory as is if it has no children
                    return directory
                }
            }

            setFileStructure((prevFileStructure) =>
                addDirectoryToParent(prevFileStructure),
            )

            if (!sendToSocket) return newDirectory.id
            socket.emit(SocketEvent.DIRECTORY_CREATED, {
                parentDirId,
                newDirectory,
            })

            return newDirectory.id
        },
        [fileStructure.id, socket],
    )

    const updateDirectory = useCallback(
        (
            dirId: string,
            children: FileSystemItem[],
            sendToSocket: boolean = true,
        ) => {
            if (!dirId) dirId = fileStructure.id

            const updateChildren = (
                directory: FileSystemItem,
            ): FileSystemItem => {
                if (directory.id === dirId) {
                    return {
                        ...directory,
                        children,
                    }
                } else if (directory.children) {
                    return {
                        ...directory,
                        children: directory.children.map(updateChildren),
                    }
                } else {
                    return directory
                }
            }

            setFileStructure((prevFileStructure) =>
                updateChildren(prevFileStructure),
            )

            // Close all open files in the directory being updated
            setOpenFiles([])

            // Set the active file to null if it's in the directory being updated
            setActiveFile(null)

            if (dirId === fileStructure.id) {
                toast.dismiss()
                toast.success("Files and folders updated")
            }

            if (!sendToSocket) return
            socket.emit(SocketEvent.DIRECTORY_UPDATED, {
                dirId,
                children,
            })
        },
        [fileStructure.id, socket],
    )

    const renameDirectory = useCallback(
        (
            dirId: string,
            newDirName: string,
            sendToSocket: boolean = true,
        ): boolean => {
            const renameInDirectory = (
                directory: FileSystemItem,
            ): FileSystemItem | null => {
                if (directory.type === "directory" && directory.children) {
                    // Check if a directory with the new name already exists
                    const isNameTaken = directory.children.some(
                        (item) =>
                            item.type === "directory" &&
                            item.name === newDirName &&
                            item.id !== dirId,
                    )

                    if (isNameTaken) {
                        return null // Name is already taken
                    }

                    return {
                        ...directory,
                        children: directory.children.map((item) => {
                            if (item.id === dirId) {
                                return {
                                    ...item,
                                    name: newDirName,
                                }
                            } else if (item.type === "directory") {
                                // Recursively update nested directories
                                const updatedNestedDir = renameInDirectory(item)
                                return updatedNestedDir !== null
                                    ? updatedNestedDir
                                    : item
                            } else {
                                return item
                            }
                        }),
                    }
                } else {
                    return directory
                }
            }

            const updatedFileStructure = renameInDirectory(fileStructure)

            if (updatedFileStructure === null) {
                return false
            }

            setFileStructure(updatedFileStructure)

            if (!sendToSocket) return true
            socket.emit(SocketEvent.DIRECTORY_RENAMED, {
                dirId,
                newDirName,
            })

            return true
        },
        [socket, setFileStructure, fileStructure],
    )

    const deleteDirectory = useCallback(
        (dirId: string, sendToSocket: boolean = true) => {
            const deleteFromDirectory = (
                directory: FileSystemItem,
            ): FileSystemItem | null => {
                if (directory.type === "directory" && directory.id === dirId) {
                    // If the current directory matches the one to delete, return null (remove it)
                    return null
                } else if (directory.children) {
                    // If it's not the directory to delete, recursively update children
                    const updatedChildren = directory.children
                        .map(deleteFromDirectory)
                        .filter((item) => item !== null) as FileSystemItem[]
                    return {
                        ...directory,
                        children: updatedChildren,
                    }
                } else {
                    // Return the directory as is if it has no children
                    return directory
                }
            }

            setFileStructure(
                (prevFileStructure) => deleteFromDirectory(prevFileStructure)!,
            )

            if (!sendToSocket) return
            socket.emit(SocketEvent.DIRECTORY_DELETED, { dirId })
        },
        [socket],
    )

    const openFile = (fileId: Id) => {
        const file = getFileById(fileStructure, fileId)

        if (file) {
            updateFileContent(activeFile?.id || "", activeFile?.content || "") // Save the content of the previously active file

            // Add the file to openFiles if it's not already open
            if (!openFiles.some((file) => file.id === fileId)) {
                setOpenFiles((prevOpenFiles) => [...prevOpenFiles, file])
            }

            // Update content in openFiles
            setOpenFiles((prevOpenFiles) =>
                prevOpenFiles.map((file) => {
                    if (file.id === activeFile?.id) {
                        return {
                            ...file,
                            content: activeFile.content || "",
                        }
                    } else {
                        return file
                    }
                }),
            )

            setActiveFile(file)
        }
    }

    const closeFile = (fileId: Id) => {
        // Set the active file to next file if there is one
        if (fileId === activeFile?.id) {
            // Save the content of the active file before closing
            updateFileContent(activeFile.id, activeFile.content || "")
            const fileIndex = openFiles.findIndex((file) => file.id === fileId)

            if (fileIndex !== -1 && openFiles.length > 1) {
                if (fileIndex > 0) {
                    setActiveFile(openFiles[fileIndex - 1])
                } else {
                    setActiveFile(openFiles[fileIndex + 1])
                }
            } else {
                setActiveFile(null)
            }
        }

        // Remove the file from openFiles
        setOpenFiles((prevOpenFiles) =>
            prevOpenFiles.filter((openFile) => openFile.id !== fileId),
        )
    }

    const createFile = useCallback(
        (
            parentDirId: string,
            file: FileName | FileSystemItem,
            sendToSocket: boolean = true,
        ): Id => {
            // Check if file with same name already exists
            let num = 1

            if (!parentDirId) parentDirId = fileStructure.id

            const parentDir = findParentDirectory(fileStructure, parentDirId)
            if (!parentDir) throw new Error("Parent directory not found")

            let newFile: FileSystemItem

            if (typeof file === "string") {
                let name = file
                let fileExists = isFileExist(parentDir, name)
                while (fileExists) {
                    name = `${name.split(".")[0]}(${num}).${name.split(".")[1]}`
                    fileExists = isFileExist(parentDir, name)
                    num++
                }

                newFile = {
                    id: uuidv4(),
                    name,
                    type: "file",
                    content: "",
                }
            } else {
                newFile = file
            }

            const updateDirectory = (
                directory: FileSystemItem,
            ): FileSystemItem => {
                if (directory.id === parentDir.id) {
                    // If directory matches parentDir, return updated directory with new file
                    return {
                        ...directory,
                        children: [...(directory.children || []), newFile],
                        isOpen: true,
                    }
                } else if (directory.children) {
                    // If directory has children, recursively update each child
                    return {
                        ...directory,
                        children: directory.children.map(updateDirectory),
                    }
                } else {
                    // Otherwise, return unchanged directory
                    return directory
                }
            }

            // Update fileStructure with the updated parentDir
            setFileStructure((prevFileStructure) =>
                updateDirectory(prevFileStructure),
            )

            // Add the new file to openFiles
            setOpenFiles((prevOpenFiles) => [...prevOpenFiles, newFile])

            // Set the new file as active file
            setActiveFile(newFile)

            if (!sendToSocket) return newFile.id
            socket.emit(SocketEvent.FILE_CREATED, {
                parentDirId,
                newFile,
            })

            return newFile.id
        },
        [fileStructure, socket],
    )

    const updateFileContent = useCallback(
        (fileId: string, newContent: string) => {
            // Recursive function to find and update the file
            const updateFile = (directory: FileSystemItem): FileSystemItem => {
                if (directory.type === "file" && directory.id === fileId) {
                    // If the current item is the file to update, return updated file
                    return {
                        ...directory,
                        content: newContent,
                    }
                } else if (directory.children) {
                    // If the current item is a directory, recursively update children
                    return {
                        ...directory,
                        children: directory.children.map(updateFile),
                    }
                } else {
                    // Otherwise, return the directory unchanged
                    return directory
                }
            }

            // Update fileStructure with the updated file content
            setFileStructure((prevFileStructure) =>
                updateFile(prevFileStructure),
            )

            // Update openFiles if the file is open
            if (openFiles.some((file) => file.id === fileId)) {
                setOpenFiles((prevOpenFiles) =>
                    prevOpenFiles.map((file) => {
                        if (file.id === fileId) {
                            return {
                                ...file,
                                content: newContent,
                            }
                        } else {
                            return file
                        }
                    }),
                )
            }
        },
        [openFiles],
    )

    const renameFile = useCallback(
        (
            fileId: string,
            newName: string,
            sendToSocket: boolean = true,
        ): boolean => {
            const renameInDirectory = (
                directory: FileSystemItem,
            ): FileSystemItem => {
                if (directory.type === "directory" && directory.children) {
                    return {
                        ...directory,
                        children: directory.children.map((item) => {
                            if (item.type === "file" && item.id === fileId) {
                                return {
                                    ...item,
                                    name: newName,
                                }
                            } else {
                                return item
                            }
                        }),
                    }
                } else {
                    return directory
                }
            }

            setFileStructure((prevFileStructure) =>
                renameInDirectory(prevFileStructure),
            )

            // Update Open Files
            setOpenFiles((prevOpenFiles) =>
                prevOpenFiles.map((file) => {
                    if (file.id === fileId) {
                        return {
                            ...file,
                            name: newName,
                        }
                    } else {
                        return file
                    }
                }),
            )

            // Update Active File
            if (fileId === activeFile?.id) {
                setActiveFile((prevActiveFile) => {
                    if (prevActiveFile) {
                        return {
                            ...prevActiveFile,
                            name: newName,
                        }
                    } else {
                        return null
                    }
                })
            }

            if (!sendToSocket) return true
            socket.emit(SocketEvent.FILE_RENAMED, {
                fileId,
                newName,
            })

            return true
        },
        [activeFile?.id, socket],
    )

    const deleteFile = useCallback(
        (fileId: string, sendToSocket: boolean = true) => {
            // Recursive function to find and delete the file in nested directories
            const deleteFileFromDirectory = (
                directory: FileSystemItem,
            ): FileSystemItem => {
                if (directory.type === "directory" && directory.children) {
                    const updatedChildren = directory.children
                        .map((child) => {
                            // Recursively process directories
                            if (child.type === "directory") {
                                return deleteFileFromDirectory(child)
                            }
                            // Filter out the file with matching id
                            if (child.id !== fileId) {
                                return child
                            }
                            return null
                        })
                        .filter((child) => child !== null)

                    // Return updated directory with filtered children
                    return {
                        ...directory,
                        children: updatedChildren as FileSystemItem[],
                    }
                } else {
                    // If it's not a directory or doesn't have children, return as is
                    return directory
                }
            }

            // Update fileStructure with the updated directory structure
            setFileStructure((prevFileStructure) =>
                deleteFileFromDirectory(prevFileStructure),
            )

            // Remove the file from openFiles
            if (openFiles.some((file) => file.id === fileId)) {
                setOpenFiles((prevOpenFiles) =>
                    prevOpenFiles.filter((file) => file.id !== fileId),
                )
            }

            // Set the active file to null if it's the file being deleted
            if (activeFile?.id === fileId) {
                setActiveFile(null)
            }

            toast.success("File deleted successfully")

            if (!sendToSocket) return
            socket.emit(SocketEvent.FILE_DELETED, { fileId })
        },
        [activeFile?.id, openFiles, socket],
    )

    const downloadFilesAndFolders = () => {
        const zip = new JSZip()

        const downloadRecursive = (
            item: FileSystemItem,
            parentPath: string = "",
        ) => {
            const currentPath =
                parentPath + item.name + (item.type === "directory" ? "/" : "")

            if (item.type === "file") {
                zip.file(currentPath, item.content || "") // Add file to zip
            } else if (item.type === "directory" && item.children) {
                for (const child of item.children) {
                    downloadRecursive(child, currentPath) // Recursively process children
                }
            }
        }

        // Start downloading from the children of the root directory
        if (fileStructure.type === "directory" && fileStructure.children) {
            for (const child of fileStructure.children) {
                downloadRecursive(child)
            }
        }

        // Generate and save zip file
        zip.generateAsync({ type: "blob" }).then((content) => {
            saveAs(content, "download.zip")
        })
    }

    const handleUserJoined = useCallback(
        ({ user }: { user: RemoteUser }) => {
            toast.success(`${user.username} joined the room`)

            // Send the code and drawing data to the server
            socket.emit(SocketEvent.SYNC_FILE_STRUCTURE, {
                fileStructure,
                openFiles,
                activeFile,
                socketId: user.socketId,
            })

            socket.emit(SocketEvent.SYNC_DRAWING, {
                drawingData,
                socketId: user.socketId,
            })

            setUsers((prev) => [...prev, user])
        },
        [activeFile, drawingData, fileStructure, openFiles, setUsers, socket],
    )

    const handleFileStructureSync = useCallback(
        ({
            fileStructure,
            openFiles,
            activeFile,
        }: {
            fileStructure: FileSystemItem
            openFiles: FileSystemItem[]
            activeFile: FileSystemItem | null
        }) => {
            setFileStructure(fileStructure)
            setOpenFiles(openFiles)
            setActiveFile(activeFile)
            toast.dismiss()
        },
        [],
    )

    const handleDirCreated = useCallback(
        ({
            parentDirId,
            newDirectory,
        }: {
            parentDirId: Id
            newDirectory: FileSystemItem
        }) => {
            createDirectory(parentDirId, newDirectory, false)
        },
        [createDirectory],
    )

    const handleDirUpdated = useCallback(
        ({ dirId, children }: { dirId: Id; children: FileSystemItem[] }) => {
            updateDirectory(dirId, children, false)
        },
        [updateDirectory],
    )

    const handleDirRenamed = useCallback(
        ({ dirId, newName }: { dirId: Id; newName: FileName }) => {
            renameDirectory(dirId, newName, false)
        },
        [renameDirectory],
    )

    const handleDirDeleted = useCallback(
        ({ dirId }: { dirId: Id }) => {
            deleteDirectory(dirId, false)
        },
        [deleteDirectory],
    )

    const handleFileCreated = useCallback(
        ({
            parentDirId,
            newFile,
        }: {
            parentDirId: Id
            newFile: FileSystemItem
        }) => {
            createFile(parentDirId, newFile, false)
        },
        [createFile],
    )

    const handleFileUpdated = useCallback(
        ({ fileId, newContent }: { fileId: Id; newContent: FileContent }) => {
            updateFileContent(fileId, newContent)
            // Update the content of the active file if it's the same file
            if (activeFile?.id === fileId) {
                setActiveFile({ ...activeFile, content: newContent })
            }
        },
        [activeFile, updateFileContent],
    )

    const handleFileRenamed = useCallback(
        ({ fileId, newName }: { fileId: string; newName: FileName }) => {
            renameFile(fileId, newName, false)
        },
        [renameFile],
    )

    const handleFileDeleted = useCallback(
        ({ fileId }: { fileId: Id }) => {
            deleteFile(fileId, false)
        },
        [deleteFile],
    )

    useEffect(() => {
        socket.once(SocketEvent.SYNC_FILE_STRUCTURE, handleFileStructureSync)
        socket.on(SocketEvent.USER_JOINED, handleUserJoined)
        socket.on(SocketEvent.DIRECTORY_CREATED, handleDirCreated)
        socket.on(SocketEvent.DIRECTORY_UPDATED, handleDirUpdated)
        socket.on(SocketEvent.DIRECTORY_RENAMED, handleDirRenamed)
        socket.on(SocketEvent.DIRECTORY_DELETED, handleDirDeleted)
        socket.on(SocketEvent.FILE_CREATED, handleFileCreated)
        socket.on(SocketEvent.FILE_UPDATED, handleFileUpdated)
        socket.on(SocketEvent.FILE_RENAMED, handleFileRenamed)
        socket.on(SocketEvent.FILE_DELETED, handleFileDeleted)

        return () => {
            socket.off(SocketEvent.USER_JOINED)
            socket.off(SocketEvent.DIRECTORY_CREATED)
            socket.off(SocketEvent.DIRECTORY_UPDATED)
            socket.off(SocketEvent.DIRECTORY_RENAMED)
            socket.off(SocketEvent.DIRECTORY_DELETED)
            socket.off(SocketEvent.FILE_CREATED)
            socket.off(SocketEvent.FILE_UPDATED)
            socket.off(SocketEvent.FILE_RENAMED)
            socket.off(SocketEvent.FILE_DELETED)
        }
    }, [
        handleDirCreated,
        handleDirDeleted,
        handleDirRenamed,
        handleDirUpdated,
        handleFileCreated,
        handleFileDeleted,
        handleFileRenamed,
        handleFileStructureSync,
        handleFileUpdated,
        handleUserJoined,
        socket,
    ])

    return (
        <FileContext.Provider
            value={{
                fileStructure,
                openFiles,
                activeFile,
                setActiveFile,
                closeFile,
                toggleDirectory,
                collapseDirectories,
                createDirectory,
                updateDirectory,
                renameDirectory,
                deleteDirectory,
                openFile,
                createFile,
                updateFileContent,
                renameFile,
                deleteFile,
                downloadFilesAndFolders,
            }}
        >
            {children}
        </FileContext.Provider>
    )
}

export { FileContextProvider }
export default FileContext
