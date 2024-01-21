import Clients from "../common/Clients"
import { useNavigate, useParams } from "react-router-dom"
import { MdOutlineContentCopy } from "react-icons/md"
import { BiExit } from "react-icons/bi"
import toast from "react-hot-toast"

function ConnectedTab() {
    const navigate = useNavigate()
    const { roomId } = useParams()

    const copyRoomId = async () => {
        try {
            await navigator.clipboard.writeText(roomId)
            toast.success("Room ID has been copied to clipboard")
        } catch (error) {
            toast.error("Could to copy room ID")
            console.log(error)
        }
    }

    const leaveRoom = () => {
        navigate("/")
    }

    return (
        <>
            {/* List of connected clients */}
            <Clients />
            <div className="flex flex-col items-center gap-4 pt-4">
                <div className="flex w-full gap-4">
                    <button
                        className="flex flex-grow justify-center rounded-lg bg-white p-3 text-black"
                        onClick={copyRoomId}
                        title="Copy room ID"
                    >
                        <MdOutlineContentCopy size={24} />
                    </button>
                    {/* Leave room button */}
                    <button
                        className="flex flex-grow justify-center rounded-lg bg-primary p-3 text-black"
                        onClick={leaveRoom}
                        title="Leave room"
                    >
                        <BiExit size={24} />
                    </button>
                </div>
            </div>
        </>
    )
}

export default ConnectedTab
