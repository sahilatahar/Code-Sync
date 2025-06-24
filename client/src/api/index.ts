const API_BASE = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api"

export async function loginUser(
    username: string,
    email: string,
    password: string,
) {
    const res = await fetch(`${API_BASE}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    })
    if (!res.ok) throw new Error((await res.json()).error || "Login failed")
    return (await res.json()).user
}
