import MenuButton from "../components/common/MenuButton"
import { useEffect, useRef } from "react"
import Editor from "../components/editor/Editor"
import Sidebar from "../components/sidebar/Sidebar"

function EditorPage() {
    const sidebarRef = useRef(null)

    useEffect(() => {
        // scroll to top for mobile devices
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="flex h-screen min-h-screen items-center justify-center">
            <MenuButton sidebarRef={sidebarRef} />
            <Sidebar sidebarRef={sidebarRef} />
            <Editor />
        </div>
    )
}

export default EditorPage
