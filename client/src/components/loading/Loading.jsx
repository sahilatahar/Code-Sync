import PropTypes from "prop-types"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

function Loading({ isError }) {
    const location = useLocation()
    const navigate = useNavigate()
    const username = location?.state?.username || ""

    const [message, setMessage] = useState(
        `Joining the room as ${username}...\nIf it takes too long, please refresh the page`,
    )

    const reloadPage = () => {
        window.location.reload()
    }

    const gotoHomePage = () => {
        navigate("/")
    }

    useEffect(() => {
        if (isError) {
            setMessage("Oops! Something went wrong. Please try again")
        }
    }, [isError])

    return (
        <div className="flex h-screen min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
            {!isError && (
                <div className="flex items-center justify-center space-x-2">
                    <span className="sr-only">Loading...</span>
                    <div className="h-4 w-4 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.3s]"></div>
                    <div className="h-4 w-4 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.15s]"></div>
                    <div className="h-4 w-4 animate-bounce rounded-full bg-slate-300"></div>
                </div>
            )}
            <span className="whitespace-break-spaces text-lg font-medium text-slate-300">
                {message}
            </span>
            {isError && (
                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        className="mr-4 rounded-md bg-primary px-8 py-2 font-bold text-black"
                        onClick={reloadPage}
                    >
                        Try Again
                    </button>
                    <button
                        className="rounded-md bg-primary px-8 py-2 font-bold text-black"
                        onClick={gotoHomePage}
                    >
                        Go to HomePage
                    </button>
                </div>
            )}
        </div>
    )
}

Loading.propTypes = {
    isError: PropTypes.bool.isRequired,
}

export default Loading
