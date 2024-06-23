interface FileSystemFileHandle extends FileSystemHandle {
    getFile(): Promise<File>
}

interface FileSystemDirectoryHandle extends FileSystemHandle {
    getFileHandle(
        name: string,
        options?: GetFileHandleOptions,
    ): Promise<FileSystemFileHandle>
    getDirectoryHandle(
        name: string,
        options?: GetDirectoryHandleOptions,
    ): Promise<FileSystemDirectoryHandle>
    removeEntry(name: string, options?: FileSystemRemoveOptions): Promise<void>
    resolve(possibleDescendant: FileSystemHandle): Promise<string[] | null>
    entries(): AsyncIterableIterator<
        [string, FileSystemFileHandle | FileSystemDirectoryHandle]
        >
    values(): AsyncIterableIterator<FileSystemFileHandle | FileSystemDirectoryHandle>
}

interface FileSystemHandle {
    kind: "file" | "directory"
    name: string
}

interface GetFileHandleOptions {
    create?: boolean
}

interface GetDirectoryHandleOptions {
    create?: boolean
}

interface FileSystemRemoveOptions {
    recursive?: boolean
}

interface Window {
    showDirectoryPicker(): Promise<FileSystemDirectoryHandle>
}
