import { createContext, useState } from "react"
import PropTypes from "prop-types"

export const Context = createContext()

export default function ContextProvider({ children }) {
	const [socket, setSocket] = useState(null)
	const [clients, setClients] = useState([])
	const [code, setCode] = useState(`function sayHi() {
  console.log("Hello world");
}`)

	return (
		<Context.Provider
			value={{
				code,
				setCode,
				socket,
				setSocket,
				clients,
				setClients,
			}}
		>
			{children}
		</Context.Provider>
	)
}

ContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
}
