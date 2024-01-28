import EditorComponent from "../components/editor/EditorComponent"
import Sidebar from "../components/sidebar/Sidebar"
import useUserActivity from "../hooks/useUserActivity"
import useWindowDimensions from "../hooks/useWindowDimensions"

function EditorPage() {
    const { isMobile } = useWindowDimensions()
    // Listen user online/offline status
    useUserActivity()

    return (
        <div className="flex h-screen min-h-screen max-w-full items-center justify-center overflow-x-hidden">
            <Sidebar />
            {!isMobile && <EditorComponent />}
        </div>
    )
}

export default EditorPage
