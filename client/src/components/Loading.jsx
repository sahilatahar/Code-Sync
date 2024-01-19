import { useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import PropTypes from "prop-types"

function Loading({ isError }) {
	const location = useLocation()
	const navigate = useNavigate()
	const username = location?.state?.username

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
		<div className="h-screen min-h-screen flex items-center justify-center flex-col gap-6">
			{!isError && (
				<div className="flex space-x-2 justify-center items-center">
					<span className="sr-only">Loading...</span>
					<div className="h-4 w-4 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
					<div className="h-4 w-4 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
					<div className="h-4 w-4 bg-slate-300 rounded-full animate-bounce"></div>
				</div>
			)}
			<span className="text-lg font-medium text-slate-300">
				{message}
			</span>
			{isError && (
				<button
					className="bg-primary py-2 px-8 rounded-lg text-black"
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
