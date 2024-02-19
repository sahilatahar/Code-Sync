import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Toast from "./components/toast/Toast"
import EditorLayout from "./layouts/EditorLayout"
import HomePage from "./pages/HomePage"
import GitHubCorner from "./components/GitHubCorner"
import useWindowDimensions from "./hooks/useWindowDimensions"

function App() {
    const { isMobile } = useWindowDimensions()
    return (
        <>
            <Toast /> {/* Toast component from react-hot-toast */}
            {!isMobile && <GitHubCorner />}
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
