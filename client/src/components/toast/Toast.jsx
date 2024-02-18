import { Toaster } from "react-hot-toast"

function Toast() {
    return (
        <Toaster
            position="top-right"
            toastOptions={{
                success: {
                    theme: {
                        primary: "#39E079",
                    },
                },
            }}
        />
    )
}

export default Toast
