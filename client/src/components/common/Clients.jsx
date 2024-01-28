import PropTypes from "prop-types"
import { useContext } from "react"
import Avatar from "react-avatar"
import AppContext from "../../context/AppContext"
import ACTIONS from "../../utils/actions"

function Clients() {
    const { clients } = useContext(AppContext)

    return (
        <div className="flex min-h-[200px] flex-grow justify-center overflow-y-auto">
            <div className="flex h-full w-full flex-wrap items-start gap-x-2 gap-y-6">
                {clients.map((client) => {
                    return <Client key={client.socketId} client={client} />
                })}
            </div>
        </div>
    )
}

const Client = ({ client }) => {
    const { username, status } = client
    const title = `${username} - ${status === ACTIONS.ONLINE ? ACTIONS.ONLINE : ACTIONS.OFFLINE}`

    return (
        <div
            className="relative flex w-[100px] flex-col items-center gap-2"
            title={title}
        >
            <Avatar name={username} size="50" round={"12px"} title={title} />
            <p className="line-clamp-2 max-w-full text-ellipsis break-words">
                {username}
            </p>
            <div
                className={`absolute right-5 top-0 h-3 w-3 rounded-full ${
                    status === ACTIONS.ONLINE ? "bg-green-500" : "bg-danger"
                }`}
            ></div>
        </div>
    )
}

Client.propTypes = {
    client: PropTypes.object.isRequired,
}

export default Clients
