import toast from "react-hot-toast"
import { BiExit } from "react-icons/bi"
import { MdOutlineContentCopy, MdOutlineIosShare } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import Clients from "../common/Clients"

function UsersTab() {
    const navigate = useNavigate()

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
        navigate("/")
    }

    return (
        <div className="tab-height flex flex-col p-4">
            <h1 className="pb-4">Clients</h1>
            {/* List of connected clients */}
            <Clients />
            <div className="flex flex-col items-center gap-4 pt-4">
                <div className="flex w-full gap-4">
                    {/* Share URL button */}
                    <button
                        className="flex flex-grow justify-center rounded-lg bg-white p-3 text-black"
                        onClick={shareURL}
                        title="Share Link"
                    >
                        <MdOutlineIosShare size={24} />
                    </button>
                    {/* Copy URL button */}
                    <button
                        className="flex flex-grow justify-center rounded-lg bg-white p-3 text-black"
                        onClick={copyURL}
                        title="Copy Link"
                    >
                        <MdOutlineContentCopy size={22} />
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
        </div>
    )
}

export default UsersTab
