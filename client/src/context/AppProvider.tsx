import { ReactNode } from "react"
import { AppContextProvider } from "./AppContext.js"
import { ChatContextProvider } from "./ChatContext.jsx"
import { FileContextProvider } from "./FileContext.jsx"
import { RunCodeContextProvider } from "./RunCodeContext.jsx"
import { SettingContextProvider } from "./SettingContext.jsx"
import { SocketProvider } from "./SocketContext.jsx"
import { TabContextProvider } from "./TabContext.jsx"

function AppProvider({ children }: { children: ReactNode }) {
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

export default AppProvider
