type Id = string
type FileName = string
type FileContent = string

interface FileSystemItem {
    id: string
    name: FileName
    type: "file" | "directory"
    children?: FileSystemItem[]
    content?: FileContent
    isOpen?: boolean
}

interface FileContext {
    fileStructure: FileSystemItem
    openFiles: FileSystemItem[]
    activeFile: FileSystemItem | null
    setActiveFile: (file: FileSystemItem) => void
    closeFile: (fileId: Id) => void
    toggleDirectory: (dirId: Id) => void
    collapseDirectories: () => void
    createDirectory: (parentDirId: Id, name: FileName) => Id
    updateDirectory: (dirId: Id, children: FileSystemItem[]) => void
    renameDirectory: (dirId: Id, newName: FileName) => void
    deleteDirectory: (dirId: Id) => void
    createFile: (parentDirId: Id, name: FileName) => Id
    updateFileContent: (fileId: Id, content: FileContent) => void
    openFile: (fileId: Id) => void
    renameFile: (fileId: Id, newName: FileName) => boolean
    deleteFile: (fileId: Id) => void
    downloadFilesAndFolders: () => void
}

export { FileSystemItem, FileContent, FileContext, Id, FileName }
