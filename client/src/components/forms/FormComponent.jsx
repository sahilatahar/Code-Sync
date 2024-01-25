import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import toast from "react-hot-toast"

function FormComponent() {
    const navigate = useNavigate()
    const location = useLocation()
    const [roomID, setRoomID] = useState("")
    const [username, setUsername] = useState("")

    const createNewRoomID = () => {
        setRoomID(uuidv4())
        toast.success("Created a new ROOM ID")
    }

    const joinRoom = (e) => {
        e.preventDefault()

        if (!roomID || !username) {
            toast.error("ROOM ID & username is required")

            return
        } else if (roomID.length < 5) {
            toast.error("ROOM ID must be at least 5 characters long")
            return
        } else if (username.length < 3) {
            toast.error("Username must be at least 3 characters long")
            return
        }

        navigate(`/editor/${roomID}`, {
            state: {
                username,
            },
        })
    }

    useEffect(() => {
        if (location.state?.roomId) {
            setRoomID(location.state.roomId)
            toast.success("Enter your username")
        }
    }, [location.state?.roomId])

    return (
        <div className="flex w-full max-w-[500px] flex-col items-center justify-center gap-4 p-4 sm:w-[500px] sm:p-8">
            <h1 className="mb-4 text-3xl md:mb-8 md:text-5xl">Code Sync</h1>
            <h4 className="self-start text-base font-bold">
                Paste Invitation ROOM ID
            </h4>
            <form onSubmit={joinRoom} className="flex w-full flex-col gap-4">
                <input
                    type="text"
                    name="roomID"
                    placeholder="ROOM ID"
                    className="w-full rounded-lg border-none px-3 py-2 text-black focus:outline-none"
                    onChange={(e) => setRoomID(e.target.value)}
                    value={roomID}
                />
                <input
                    type="text"
                    name="username"
                    placeholder="USERNAME"
                    className="w-full rounded-lg border-none px-3 py-2 text-black focus:outline-none"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <button
                    type="submit"
                    className="self-end rounded-lg bg-primary px-8 py-2 text-black"
                    onClick={joinRoom}
                >
                    Join
                </button>
            </form>
            <p className="select-none self-start">
                {"If you don't have an invite then create"}{" "}
                <span
                    className="cursor-pointer text-primary underline"
                    onClick={createNewRoomID}
                >
                    new room
                </span>
            </p>
        </div>
    )
}

export default FormComponent
