import toast from "react-hot-toast"
import { Copy, Export, SignOut } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import Users from "@/components/common/Users"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import useAppContext from "@/hooks/useAppContext"
import UserStatus from "@/utils/status"
import useSocket from "@/hooks/useSocket"

function UsersTab() {
    const navigate = useNavigate()
    const { tabHeight } = useWindowDimensions()
    const { setStatus } = useAppContext()
    const { socket } = useSocket()

    const copyURL = async () => {
        const url = window.location.href
        try {
            await navigator.clipboard.writeText(url)
            toast.success("URL copied to clipboard")
        } catch (error) {
            toast.error("Unable to copy URL to clipboard")
            console.log(error)
        }
    }

    const shareURL = async () => {
        const url = window.location.href
        try {
            await navigator.share({ url })
        } catch (error) {
            toast.error("Unable to share URL")
            console.log(error)
        }
    }

    const leaveRoom = () => {
        socket.disconnect()
        setStatus(UserStatus.DISCONNECTED)
        navigate("/", {
            replace: true,
        })
    }

    return (
        <div className="flex flex-col p-4" style={{ height: tabHeight }}>
            <h1 className="tab-title">Users</h1>
            {/* List of connected users */}
            <Users />
            <div className="flex flex-col items-center gap-4 pt-4">
                <div className="flex w-full gap-4">
                    {/* Share URL button */}
                    <button
                        className="flex flex-grow justify-center rounded-md bg-white p-3 text-black"
                        onClick={shareURL}
                        title="Share Link"
                    >
                        <Export size={26} />
                    </button>
                    {/* Copy URL button */}
                    <button
                        className="flex flex-grow justify-center rounded-md bg-white p-3 text-black"
                        onClick={copyURL}
                        title="Copy Link"
                    >
                        <Copy size={26} />
                    </button>
                    {/* Leave room button */}
                    <button
                        className="flex flex-grow justify-center rounded-md bg-primary p-3 text-black"
                        onClick={leaveRoom}
                        title="Leave room"
                    >
                        <SignOut size={26} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UsersTab
