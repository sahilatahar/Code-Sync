function useLocalStorage() {
    const setItem = (key, value) => {
        localStorage.setItem(key, value)
    }

    const getItem = (key) => {
        return localStorage.getItem(key)
    }

    const removeItem = (key) => {
        localStorage.removeItem(key)
    }

    return { setItem, getItem, removeItem }
}

export default useLocalStorage
