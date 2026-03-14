import { useAppContext } from "@/context/AppContext";
import { useSocket } from "@/context/SocketContext";
import { MouseEvent, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { USER_STATUS } from "@/types/user"
import { SocketEvent } from "@/types/socket";
import toast from "react-hot-toast";


function Card({data}: {data: {name: string, roomId: string} }) {
    
    const userInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo") || "") : null;

    const location = useLocation()
    const { currentUser, setCurrentUser, status, setStatus } = useAppContext()
    const { socket } = useSocket()

    const navigate = useNavigate()

    const joinRoom = (e: MouseEvent<HTMLButtonElement>) => {

        setCurrentUser({ ...currentUser, roomId: data.roomId })
        setCurrentUser({ ...currentUser, username: userInfo.name })

        e.preventDefault()
        if (status === USER_STATUS.ATTEMPTING_JOIN) return
        
        toast.loading("Joining room...")
        setStatus(USER_STATUS.ATTEMPTING_JOIN)
        socket.emit(SocketEvent.JOIN_REQUEST, currentUser)
    }

    useEffect(() => {
        if (status === USER_STATUS.DISCONNECTED && !socket.connected) {
            socket.connect()
            return
        }

        const isRedirect = sessionStorage.getItem("redirect") || false

        if (status === USER_STATUS.JOINED && !isRedirect) {
            const username = currentUser.username
            sessionStorage.setItem("redirect", "true")
            navigate(`/editor/${data.roomId}`, {
                state: {
                    username,
                },
            })
        } else if (status === USER_STATUS.JOINED && isRedirect) {
            sessionStorage.removeItem("redirect")
            setStatus(USER_STATUS.DISCONNECTED)
            socket.disconnect()
            socket.connect()
        }
    }, [currentUser, location.state?.redirect, navigate, setStatus, socket, status])
    

  return (
    <div
        className=''
    >
        <img src="https://plus.unsplash.com/premium_photo-1661877737564-3dfd7282efcb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29kaW5nfGVufDB8fDB8fHww" alt="Card Image" 
            className="w-full h-48 object-cover rounded-md"

        />
        <h3 className="mt-2 text-lg font-semibold text-white">{data.name}</h3>
        <p>Room ID : {data.roomId}</p>
        <a href='/'>
            <button
                className="mt-2 w-full rounded-md bg-primary px-5 py-2 text-lg font-semibold text-black"
                onClick={joinRoom}
            >Join Room</button>
        </a>
    </div>
  )
}

export default Card