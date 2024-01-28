import PropTypes from "prop-types"
import { AppContextProvider } from "./AppContext.jsx"
import { ChatContextProvider } from "./ChatContext.jsx"
import { FileContextProvider } from "./FileContext.jsx"
import { TabContextProvider } from "./TabContext.jsx"

function AppProvider({ children }) {
    return (
        <AppContextProvider>
            <FileContextProvider>
                <TabContextProvider>
                    <ChatContextProvider>{children}</ChatContextProvider>
                </TabContextProvider>
            </FileContextProvider>
        </AppContextProvider>
    )
}

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppProvider
