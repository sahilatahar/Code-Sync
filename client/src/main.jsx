import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import ContextProvider from "./context/ContextProvider.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
	<ContextProvider>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</ContextProvider>
)
