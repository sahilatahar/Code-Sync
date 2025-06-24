import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import GitHubCorner from "./components/GitHubCorner"
import Toast from "./components/toast/Toast"
import EditorPage from "./pages/EditorPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import { useUser } from "./context/UserContext"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useUser()
    if (!user) {
        return <Navigate to="/login" replace />
    }
    return children
}

const App = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route
                        path="/editor/:roomId"
                        element={
                            <ProtectedRoute>
                                <EditorPage />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
            <Toast /> {/* Toast component from react-hot-toast */}
            <GitHubCorner />
        </>
    )
}

export default App
