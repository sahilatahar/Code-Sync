import SplitterComponent from "../components/SplitterComponent"
import EditorComponent from "../components/editor/EditorComponent"
import Sidebar from "../components/sidebar/Sidebar"
import useUserActivity from "../hooks/useUserActivity"

function EditorPage() {
    // Listen user online/offline status
    useUserActivity()

    return (
        <SplitterComponent>
            <Sidebar />
            <EditorComponent />
        </SplitterComponent>
    )
}

export default EditorPage
