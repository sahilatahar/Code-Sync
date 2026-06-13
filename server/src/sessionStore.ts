import { FileSystemItem, Id } from "./types/file"

const roots = new Map<string, FileSystemItem>()

function findNodeById(root: FileSystemItem, id: Id): FileSystemItem | null {
	if (root.id === id) return root
	if (root.type === "directory" && root.children) {
		for (const child of root.children) {
			const found = findNodeById(child, id)
			if (found) return found
		}
	}
	return null
}

function findParentById(root: FileSystemItem, id: Id): FileSystemItem | null {
	if (root.type !== "directory" || !root.children) return null
	if (root.children.some(c => c.id === id)) return root
	for (const child of root.children) {
		if (child.type === "directory") {
			const found = findParentById(child, id)
			if (found) return found
		}
	}
	return null
}

export function findFirstFile(root: FileSystemItem): FileSystemItem | null {
	if (root.type === "file") return root
	if (root.type === "directory" && root.children) {
		for (const child of root.children) {
			const found = findFirstFile(child)
			if (found) return found
		}
	}
	return null
}

export function getRoot(roomId: string): FileSystemItem | null {
	const root = roots.get(roomId)
	return root ? structuredClone(root) : null
}

export function saveRoot(roomId: string, root: FileSystemItem): void {
	roots.set(roomId, structuredClone(root))
}

export function applyNodeCreated(roomId: string, parentDirId: Id, newNode: FileSystemItem): void {
	const root = roots.get(roomId)
	if (!root) return
	const parent = findNodeById(root, parentDirId)
	if (!parent || parent.type !== "directory") return
	if (!parent.children) parent.children = []
	parent.children.push(newNode)
}

export function applyNodeRenamed(roomId: string, nodeId: Id, newName: string): void {
	const root = roots.get(roomId)
	if (!root) return
	const node = findNodeById(root, nodeId)
	if (!node) return
	node.name = newName
}

export function applyNodeDeleted(roomId: string, nodeId: Id): void {
	const root = roots.get(roomId)
	if (!root) return
	const parent = findParentById(root, nodeId)
	if (!parent || !parent.children) return
	parent.children = parent.children.filter(c => c.id !== nodeId)
}

export function applyFileUpdated(roomId: string, fileId: Id, newContent: string): void {
	const root = roots.get(roomId)
	if (!root) return
	const file = findNodeById(root, fileId)
	if (!file || file.type !== "file") return
	file.content = newContent
}

export function applyDirectoryUpdated(roomId: string, dirId: Id, children: FileSystemItem[]): void {
	const root = roots.get(roomId)
	if (!root) return
	const dir = findNodeById(root, dirId)
	if (!dir || dir.type !== "directory") return
	dir.children = children
}
