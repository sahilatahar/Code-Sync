import MenuButton from "../components/common/MenuButton"
import { useContext, useEffect, useRef } from "react"
import Editor from "../components/editor/Editor"
import Sidebar from "../components/sidebar/Sidebar"
import { FileContext } from "../context/FileContextProvider"
import useUserActivity from "../hooks/useUserActivity"
import usePageEvents from "../hooks/usePageEvents"

function EditorPage() {
    const sidebarRef = useRef(null)
    const { currentFile } = useContext(FileContext)
    // Listen user online/offline status
    useUserActivity()
    // Prevent page reload
    usePageEvents()

    useEffect(() => {
        // scroll to top for mobile devices
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="flex h-screen min-h-screen items-center justify-center">
            <MenuButton sidebarRef={sidebarRef} />
            <Sidebar sidebarRef={sidebarRef} />
            <div className="w-[calc(100%-300px)] flex-grow overflow-x-hidden">
                {currentFile !== null ? (
                    <Editor />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <h1 className="text-xl text-white">
                            No file is currently open.
                        </h1>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EditorPage
