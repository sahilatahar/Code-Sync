import MenuButton from "../components/EditorPage/MenuButton"
import { useEffect, useRef } from "react"
import Editor from "../components/EditorPage/Editor"
import Sidebar from "../components/EditorPage/Sidebar"

function EditorPage() {
	const sidebarRef = useRef(null)

	useEffect(() => {
		// scroll to top for mobile devices
		window.scrollTo(0, 0)
	}, [])

	return (
		<div className="h-screen min-h-screen flex items-center justify-center">
			<MenuButton sidebarRef={sidebarRef} />
			<Sidebar sidebarRef={sidebarRef} />
			<Editor />
		</div>
	)
}

export default EditorPage
