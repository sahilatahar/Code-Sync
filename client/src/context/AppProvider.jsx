import PropTypes from "prop-types"
import { AppContextProvider } from "./AppContext.jsx"
import { ChatContextProvider } from "./ChatContext.jsx"
import { FileContextProvider } from "./FileContext.jsx"
import { SettingContextProvider } from "./SettingContext.jsx"
import { SocketProvider } from "./SocketContext.jsx"
import { TabContextProvider } from "./TabContext.jsx"
import { RunCodeContextProvider } from "./RunCodeContext.jsx"

function AppProvider({ children }) {
    return (
        <AppContextProvider>
            <SocketProvider>
                <SettingContextProvider>
                    <TabContextProvider>
                        <FileContextProvider>
                            <RunCodeContextProvider>
                                <ChatContextProvider>
                                    {children}
                                </ChatContextProvider>
                            </RunCodeContextProvider>
                        </FileContextProvider>
                    </TabContextProvider>
                </SettingContextProvider>
            </SocketProvider>
        </AppContextProvider>
    )
}

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppProvider
