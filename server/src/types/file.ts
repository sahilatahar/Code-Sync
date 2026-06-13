type Id = string

interface FileSystemItem {
    id: Id
    name: string
    type: "file" | "directory"
    children?: FileSystemItem[]
    content?: string
}

export { FileSystemItem, Id }