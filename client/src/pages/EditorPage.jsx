import SplitterComponent from "../components/SplitterComponent"
import EditorComponent from "../components/editor/EditorComponent"
import Sidebar from "../components/sidebar/Sidebar"
import useClientActivity from "../hooks/useClientActivity"

function EditorPage() {
    // Listen client online/offline status
    useClientActivity()

    return (
        <SplitterComponent>
            <Sidebar />
            <EditorComponent />
        </SplitterComponent>
    )
}

export default EditorPage
