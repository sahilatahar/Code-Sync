import Avatar from "react-avatar"
import PropTypes from "prop-types"
import { useContext } from "react"
import { Context } from "../../context/ContextProvider"

function Clients() {
    const { clients } = useContext(Context)

    return (
        <div className="flex min-h-[200px] flex-grow justify-center overflow-y-auto">
            <div className="flex h-full w-full flex-wrap items-start gap-x-2 gap-y-6">
                {clients.map((client) => {
                    return (
                        <Client
                            key={client.socketId}
                            username={client.username}
                        />
                    )
                })}
            </div>
        </div>
    )
}

const Client = ({ username }) => {
    return (
        <div className="flex w-[100px] flex-col items-center gap-2">
            <Avatar name={username} size="50" round={"12px"} />
            <p className="line-clamp-2 max-w-full text-ellipsis break-words">
                {username}
            </p>
        </div>
    )
}

Client.propTypes = {
    username: PropTypes.string.isRequired,
}

export default Clients
