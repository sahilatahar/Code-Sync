import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import PropTypes from "prop-types"

function Loading({ isError }) {
    const location = useLocation()
    const navigate = useNavigate()
    const username = location?.state?.username || ""

    const [message, setMessage] = useState(`Joining the room as ${username}...`)

    const gotoHomePage = () => {
        navigate("/")
    }

    useEffect(() => {
        if (isError) {
            setMessage("Oops! Something went wrong. Please try again later.")
        }
    }, [isError])

    return (
        <div className="flex h-screen min-h-screen flex-col items-center justify-center gap-6">
            {!isError && (
                <div className="flex items-center justify-center space-x-2">
                    <span className="sr-only">Loading...</span>
                    <div className="h-4 w-4 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.3s]"></div>
                    <div className="h-4 w-4 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.15s]"></div>
                    <div className="h-4 w-4 animate-bounce rounded-full bg-slate-300"></div>
                </div>
            )}
            <span className="text-lg font-medium text-slate-300">
                {message}
            </span>
            {isError && (
                <button
                    className="rounded-lg bg-primary px-8 py-2 text-black"
                    onClick={gotoHomePage}
                >
                    Go to HomePage
                </button>
            )}
        </div>
    )
}

Loading.propTypes = {
    isError: PropTypes.bool.isRequired,
}

export default Loading
