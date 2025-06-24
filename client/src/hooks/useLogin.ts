import { useState } from "react"
import { loginUser } from "../api"
import { useUser } from "../context/UserContext"

export function useLogin() {
    const { setUser } = useUser()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function login(username: string, email: string, password: string) {
        setLoading(true)
        setError(null)
        try {
            const user = await loginUser(username, email, password)
            setUser(user)
        } catch (err: any) {
            setError(err.message)
            console.error("Login error:", err)
        } finally {
            setLoading(false)
        }
    }

    return { login, loading, error }
}