import PropTypes from "prop-types"
import { AppContextProvider } from "./AppContext.jsx"
import { ChatContextProvider } from "./ChatContext.jsx"
import { FileContextProvider } from "./FileContext.jsx"
import { TabContextProvider } from "./TabContext.jsx"
import { SettingContextProvider } from "./SettingContext.jsx"

function AppProvider({ children }) {
    return (
        <AppContextProvider>
            <SettingContextProvider>
                <FileContextProvider>
                    <TabContextProvider>
                        <ChatContextProvider>{children}</ChatContextProvider>
                    </TabContextProvider>
                </FileContextProvider>
            </SettingContextProvider>
        </AppContextProvider>
    )
}

AppProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AppProvider
