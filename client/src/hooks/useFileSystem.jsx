import { useContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import initialCode from "../utils/initialCode"
import ACTIONS from "../utils/actions"
import { useParams } from "react-router-dom"
import { Context } from "../context/ContextProvider"
import toast from "react-hot-toast"

function useFileSystem() {
    const { roomId } = useParams()

    const initialFile = {
        id: uuidv4(),
        name: "index.js",
        content: initialCode,
    }
    const [files, setFiles] = useState([initialFile])
    const [currentFile, setCurrentFile] = useState(initialFile)
    const { socket } = useContext(Context)

    const createFile = (name) => {
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
        socket.emit(ACTIONS.FILE_CREATED, { file, roomId })
        return id
    }

    const updateFile = (id, content) => {
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

    const openFile = (id) => {
        // Save current file
        if (currentFile) {
            updateFile(currentFile.id, currentFile.content)
        }
        const file = files.find((file) => file.id === id)
        setCurrentFile(file)
    }

    const renameFile = (id, newName) => {
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
        socket.emit(ACTIONS.FILE_RENAMED, { roomId, file })

        return true
    }

    const deleteFile = (id) => {
        setFiles((prev) => prev.filter((file) => file.id !== id))
        if (currentFile.id === id) {
            setCurrentFile(null)
        }
        // File deleted event sent to server
        socket.emit(ACTIONS.FILE_DELETED, { roomId, id })
    }

    useEffect(() => {
        if (socket === null) return

        socket.once(ACTIONS.SYNC_FILES, ({ files, currentFile }) => {
            setFiles(files)
            setCurrentFile(currentFile)
        })

        socket.on(ACTIONS.FILE_RENAMED, ({ file }) => {
            setFiles((prev) =>
                prev.map((f) => {
                    if (f.id === file.id) {
                        f.name = file.name
                    }
                    return f
                }),
            )
        })

        socket.on(ACTIONS.FILE_DELETED, ({ id }) => {
            setFiles((prev) => prev.filter((file) => file.id !== id))
            if (currentFile.id === id) {
                setCurrentFile(null)
            }
        })

        socket.on(ACTIONS.FILE_CREATED, ({ file }) => {
            setFiles((prev) => [...prev, file])
        })

        socket.on(ACTIONS.FILE_UPDATED, ({ file }) => {
            setFiles((prev) =>
                prev.map((f) => {
                    if (f.id === file.id) {
                        f.content = file.content
                    }
                    return f
                }),
            )
            if (currentFile.id === file.id) {
                setCurrentFile(file)
            }
        })

        return () => {
            if (socket == null) return
            socket.off(ACTIONS.FILE_CREATED)
            socket.off(ACTIONS.FILE_UPDATED)
            socket.off(ACTIONS.FILE_RENAMED)
            socket.off(ACTIONS.FILE_DELETED)
        }
    }, [socket, roomId, setFiles, currentFile])

    useEffect(() => {
        if (socket == null) return

        socket.on(ACTIONS.JOINED, ({ username, socketId }) => {
            toast.success(`${username} joined the room`)
            // send the code to the server
            socket.emit(ACTIONS.SYNC_FILES, {
                files,
                currentFile,
                socketId,
            })
        })

        return () => {
            socket.off(ACTIONS.JOINED)
        }
    }, [socket, files, currentFile])

    return {
        files,
        setFiles,
        currentFile,
        setCurrentFile,
        createFile,
        updateFile,
        openFile,
        renameFile,
        deleteFile,
    }
}

export default useFileSystem
