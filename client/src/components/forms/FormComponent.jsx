import { useContext, useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import toast from "react-hot-toast"
import AppContext from "../../context/AppContext"

function FormComponent() {
    const navigate = useNavigate()
    const location = useLocation()
    const [roomId, setRoomId] = useState("")
    const [username, setUsername] = useState("")
    const {
        setRoomId: setRoomIdToContext,
        setUsername: setUsernameToContext,
        username: usernameInContext,
    } = useContext(AppContext)
    const usernameRef = useRef(null)

    const createNewRoomId = () => {
        setRoomId(uuidv4())
        toast.success("Created a new ROOM Id")
        usernameRef.current.focus()
    }

    const joinRoom = (e) => {
        e.preventDefault()

        if (!roomId || !username) {
            toast.error("ROOM Id & username is required")

            return
        } else if (roomId.length < 5) {
            toast.error("ROOM Id must be at least 5 characters long")
            return
        } else if (username.length < 3) {
            toast.error("Username must be at least 3 characters long")
            return
        }

        // set roomId & username to context
        setRoomIdToContext(roomId)
        setUsernameToContext(username)

        navigate(`/editor/${roomId}`, {
            state: {
                username,
            },
        })
    }

    useEffect(() => {
        if (location.state?.roomId) {
            setRoomId(location.state.roomId)
            if (usernameInContext.length === 0) {
                toast.success("Enter your username")
            }
        }
    }, [location.state?.roomId, usernameInContext])

    return (
        <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-4 p-4 sm:w-[500px] sm:p-8">
            <h1 className="text-4xl sm:text-5xl">Code Sync</h1>
            <p className="mb-4 text-center md:mb-8">
                {"Code, Chat, Collaborate. It's All in Sync."}
            </p>
            <form onSubmit={joinRoom} className="flex w-full flex-col gap-4">
                <input
                    type="text"
                    name="roomId"
                    placeholder="ROOM Id"
                    className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3 focus:outline-none"
                    onChange={(e) => setRoomId(e.target.value)}
                    value={roomId}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="USERNAME"
                    className="w-full rounded-md border border-gray-500 bg-darkHover px-3 py-3 focus:outline-none"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    ref={usernameRef}
                />
                <button
                    type="submit"
                    className="mt-2 w-full rounded-md bg-primary px-8 py-3 text-lg font-semibold text-black"
                    onClick={joinRoom}
                >
                    Join
                </button>
            </form>
            <button
                className="cursor-pointer select-none underline"
                onClick={createNewRoomId}
            >
                Generate Unique Room ID
            </button>
        </div>
    )
}

export default FormComponent
