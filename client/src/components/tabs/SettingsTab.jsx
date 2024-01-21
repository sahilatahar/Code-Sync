import { useContext, useEffect } from "react"
import { Context } from "../../context/ContextProvider"
import useLocalStorage from "../../hooks/useLocalStorage"
import Select from "../common/Select"
import { editorThemes } from "../../resources/Themes"
import { editorLanguages } from "../../resources/Languages"
import { editorFonts } from "../../resources/Fonts"

function SettingsTab() {
    const { settings, updateSettings } = useContext(Context)
    const { theme, language, fontFamily, fontSize } = settings
    const { setItem } = useLocalStorage()

    const handleFontFamilyChange = (e) => {
        const fontFamily = e.target.value
        updateSettings((prev) => ({ ...prev, fontFamily }))
        setItem("settings", JSON.stringify({ ...settings, fontFamily }))
    }

    const handleThemeChange = (e) => {
        const theme = e.target.value
        updateSettings((prev) => ({ ...prev, theme }))
        setItem("settings", JSON.stringify({ ...settings, theme }))
    }

    const handleLanguageChange = (e) => {
        const language = e.target.value
        updateSettings((prev) => ({ ...prev, language }))
        setItem("settings", JSON.stringify({ ...settings, language }))
    }

    const handleFontSizeChange = (e) => {
        const fontSize = e.target.value
        updateSettings((prev) => ({ ...prev, fontSize }))
        setItem("settings", JSON.stringify({ ...settings, fontSize }))
    }

    useEffect(() => {
        // Set editor font family
        const editor = document.querySelector(".cm-editor > .cm-scroller")
        if (editor !== null) {
            editor.style.fontFamily = `${fontFamily}, monospace`
        }
    }, [fontFamily])

    return (
        <div className="flex flex-col items-center gap-2 pt-3">
            {/* Choose Font Family option */}
            <div className="flex w-full items-end gap-2">
                <Select
                    onChange={handleFontFamilyChange}
                    value={fontFamily}
                    options={editorFonts}
                    title="Fonts"
                />
                {/* Choose font size option */}
                <select
                    value={fontSize}
                    onChange={handleFontSizeChange}
                    className="rounded-lg border-none bg-white  px-4 py-2 text-black outline-none"
                    title="Font Size"
                >
                    {[...Array(13).keys()].map((size) => {
                        return (
                            <option key={size} value={size + 12}>
                                {size + 12}
                            </option>
                        )
                    })}
                </select>
            </div>
            {/* Choose theme option */}
            <Select
                onChange={handleThemeChange}
                value={theme}
                options={editorThemes}
                title="Themes"
            />
            {/* Choose language option */}
            <Select
                onChange={handleLanguageChange}
                value={language}
                options={editorLanguages}
                title="Languages"
            />
        </div>
    )
}

export default SettingsTab
