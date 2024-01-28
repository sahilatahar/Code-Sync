import { Toaster } from "react-hot-toast"

function Toast() {
    return (
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
    )
}

export default Toast
