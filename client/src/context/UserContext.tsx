import React, { createContext, useContext, useState } from "react"
import { IUserDTO } from "../types/user"

interface UserContextType {
    user: IUserDTO | null
    setUser: (user: IUserDTO | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

function getInitialUser(): IUserDTO | null {
    const stored = localStorage.getItem("user")
    if (stored) {
        try {
            return JSON.parse(stored)
        } catch {
            return null
        }
    }
    return null
}

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, _setUser] = useState<IUserDTO | null>(getInitialUser())
    const setUser = (user: IUserDTO | null) => {
        _setUser(user)
        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
        } else {
            localStorage.removeItem("user")
        }
    }
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    const ctx = useContext(UserContext)
    if (!ctx) throw new Error("useUser must be used within UserProvider")
    return ctx
}

export default UserContext
