import PropTypes from "prop-types"
import { useLocation, useNavigate } from "react-router-dom"
import socketStatus from "../../utils/socketStatus"

function Loading({ status }) {
    const location = useLocation()
    const username = location?.state?.username || ""

    return (
        <div className="flex h-screen min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
            {status === socketStatus.CONNECTING ? (
                <ConnectingStatus username={username} />
            ) : (
                <ConnectionErrorOptions />
            )}
        </div>
    )
}

Loading.propTypes = {
    status: PropTypes.string.isRequired,
}

const ConnectingStatus = ({ username }) => {
    return (
        <>
            <div className="flex items-center justify-center space-x-2">
                <span className="sr-only">Loading...</span>
                <div className="h-4 w-4 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.3s]"></div>
                <div className="h-4 w-4 animate-bounce rounded-full bg-slate-300 [animation-delay:-0.15s]"></div>
                <div className="h-4 w-4 animate-bounce rounded-full bg-slate-300"></div>
            </div>
            <span className="whitespace-break-spaces text-lg font-medium text-slate-300">
                {`Joining the room as ${username}...\nIf it takes too long, please refresh the page`}
            </span>
        </>
    )
}

ConnectingStatus.propTypes = {
    username: PropTypes.string.isRequired,
}

const ConnectionErrorOptions = () => {
    const navigate = useNavigate()
    const reloadPage = () => {
        window.location.reload()
    }

    const gotoHomePage = () => {
        navigate("/")
    }
    return (
        <>
            <span className="whitespace-break-spaces text-lg font-medium text-slate-300">
                Oops! Something went wrong. Please try again
            </span>
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
        </>
    )
}

export default Loading
