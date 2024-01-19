import CodeMirror from "@uiw/react-codemirror"
import { dracula } from "@uiw/codemirror-theme-dracula"
import { javascript } from "@codemirror/lang-javascript"
import { useContext } from "react"
import { Context } from "../../context/ContextProvider"
import ACTIONS from "../../actions/Actions"
import { useParams } from "react-router-dom"

function Editor() {
	const { code, setCode, socket } = useContext(Context)
	const { roomId } = useParams()

	const onCodeChange = (code) => {
		socket.emit(ACTIONS.CODE_CHANGE, {
			roomId,
			code,
		})

		setCode(code)
	}

	return (
		<div className="flex-grow">
			<CodeMirror
				placeholder="// Write your code here..."
				mode="javascript"
				theme={dracula}
				onChange={onCodeChange}
				value={code}
				extensions={[javascript({ jsx: true })]}
				minHeight="100vh"
				maxHeight="100vh"
				minWidth="100%"
				maxWidth="100%"
				style={{ fontSize: "1rem" }}
			/>
		</div>
	)
}

export default Editor
