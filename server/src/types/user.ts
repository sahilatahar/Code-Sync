enum USER_CONNECTION_STATUS {
	OFFLINE = "offline",
	ONLINE = "online",
}

interface User {
	username: string
	roomId: string
	status: USER_CONNECTION_STATUS
	cursorPosition: number
	typing: boolean
	currentFile: string | null
	socketId: string
}

export { USER_CONNECTION_STATUS, User }

export interface IUserDTO {
    _id: string
    username: string
    email: string
    avatarUrl?: string
    createdAt: string
    updatedAt: string
}
