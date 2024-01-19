import Avatar from "react-avatar"
import PropTypes from "prop-types"

const Client = ({ username }) => {
	return (
		<div className="w-[100px] flex flex-col items-center gap-2">
			<Avatar name={username} size="50" round={"12px"} />
			<p className="max-w-full text-ellipsis line-clamp-2 break-words">
				{username}
			</p>
		</div>
	)
}

Client.propTypes = {
	username: PropTypes.string.isRequired,
}

export default Client
