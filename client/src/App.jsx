import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import EditorLayout from "./layouts/EditorLayout"
import { Toaster } from "react-hot-toast"

function App() {
    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    success: {
                        theme: {
                            primary: "#4aee88",
                        },
                    },
                }}
            />
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/editor/:roomId" element={<EditorLayout />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
