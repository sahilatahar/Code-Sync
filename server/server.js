const express = require("express")
const app = express()
require("dotenv").config()
const http = require("http")
const cors = require("cors")
const ACTIONS = require("./utils/actions")
const path = require("path")

app.use(express.json())

app.use(cors())

const { Server } = require("socket.io")

const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: "*",
	},
})

const userSocketMap = {}

function getAllConnectedClient(roomId) {
	return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
		(socketId) => {
			return {
				socketId,
				username: userSocketMap[socketId]?.username,
			}
		}
	)
}

io.on("connection", (socket) => {
	socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
		userSocketMap[socket.id] = { username, roomId }
		socket.join(roomId)
		const clients = getAllConnectedClient(roomId)
		socket.broadcast.to(roomId).emit(ACTIONS.JOINED, {
			username,
			socketId: socket.id,
		})

		// Send clients list to all sockets in room
		io.to(roomId).emit(ACTIONS.UPDATE_CLIENTS_LIST, { clients })
	})

	socket.on("disconnecting", () => {
		const rooms = [...socket.rooms]
		rooms.forEach((roomId) => {
			const clients = getAllConnectedClient(roomId)
			clients.forEach(({ socketId }) => {
				io.to(socketId).emit(ACTIONS.DISCONNECTED, {
					username: userSocketMap[socket.id]?.username,
					socketId: socket.id,
				})
			})
		})

		delete userSocketMap[socket.id]
		socket.leave()
	})

	socket.on(ACTIONS.SYNC_FILES, ({ files, currentFile, socketId }) => {
		io.to(socketId).emit(ACTIONS.SYNC_FILES, { files, currentFile })
	})

	socket.on(ACTIONS.FILE_CREATED, ({ roomId, file }) => {
		socket.broadcast.to(roomId).emit(ACTIONS.FILE_CREATED, { file })
	})

	socket.on(ACTIONS.FILE_UPDATED, ({ roomId, file }) => {
		socket.broadcast.to(roomId).emit(ACTIONS.FILE_UPDATED, { file })
	})

	socket.on(ACTIONS.FILE_RENAMED, ({ roomId, file }) => {
		socket.broadcast.to(roomId).emit(ACTIONS.FILE_RENAMED, { file })
	})

	socket.on(ACTIONS.FILE_DELETED, ({ roomId, id }) => {
		socket.broadcast.to(roomId).emit(ACTIONS.FILE_DELETED, { id })
	})
})

const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV === "production") {
	app.use(express.static("public"))

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "public", "index.html"))
	})
} else {
	app.get("/", (req, res) => {
		res.send("API is running successfully")
	})
}

server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
})
