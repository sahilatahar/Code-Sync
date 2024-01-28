import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Toast from "./components/toast/Toast"
import EditorLayout from "./layouts/EditorLayout"
import HomePage from "./pages/HomePage"

function App() {
    return (
        <>
            <Toast /> {/* Toast component from react-hot-toast */}
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/editor/:roomId" element={<EditorLayout />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
