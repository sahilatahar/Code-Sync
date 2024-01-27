import { useEffect } from "react"

function usePageEvents() {
    useEffect(() => {
        // Prevent user from leaving the page
        const beforeUnloadHandler = (e) => {
            const msg =
                "Changes you made may not be saved"
            return (e.returnValue = msg)
        }

        window.addEventListener("beforeunload", beforeUnloadHandler)

        return () => {
            window.removeEventListener("beforeunload", beforeUnloadHandler)
        }
    }, [])
}

export default usePageEvents
