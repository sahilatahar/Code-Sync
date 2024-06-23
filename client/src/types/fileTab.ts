import { FileSystemItem } from "./file"

interface FileTabContext {
    activeFile: FileSystemItem | null
    setActiveFile: (file: FileSystemItem) => void
    changeActiveFile: (fileId: string) => void
}

export { FileTabContext }
