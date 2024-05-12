import { createContext, useEffect, useState } from "react"
import PropTypes from "prop-types"
import useFileSystem from "@/hooks/useFileSystem"
import axiosInstance from "@/api/"
import toast from "react-hot-toast"
import langMap from "lang-map"

const RunCodeContext = createContext()

const RunCodeContextProvider = ({ children }) => {
    const { currentFile } = useFileSystem()
    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [isRunning, setIsRunning] = useState(false)
    const [supportedLanguages, setSupportedLanguages] = useState([])
    const [selectedLanguage, setSelectedLanguage] = useState("")

    useEffect(() => {
        const fetchSupportedLanguages = async () => {
            try {
                const languages = await axiosInstance.get("/runtimes")
                setSupportedLanguages(languages.data)
            } catch (error) {
                console.error(error.response.data)
                toast.error("Failed to fetch supported languages")
            }
        }

        fetchSupportedLanguages()
    }, [])

    // Set the selected language based on the file extension
    useEffect(() => {
        if (supportedLanguages.length === 0 || !currentFile?.name) return

        const extension = currentFile.name.split(".").pop()
        const languageName = langMap.languages(extension)
        const language = supportedLanguages.find(
            (lang) =>
                lang.aliases.includes(extension) ||
                languageName.includes(lang.language.toLowerCase()),
        )

        if (language) setSelectedLanguage(language)
        else setSelectedLanguage("")
    }, [currentFile?.name, supportedLanguages])

    const runCode = async () => {
        try {
            if (!selectedLanguage) {
                return toast.error("Please select a language to run the code")
            } else if (!currentFile) {
                return toast.error("Please open a file to run the code")
            } else {
                toast.loading("Running code...")
            }

            setIsRunning(true)
            const { language, version } = selectedLanguage

            const response = await axiosInstance.post("/execute", {
                language,
                version,
                files: [
                    { name: currentFile.name, content: currentFile.content },
                ],
                stdin: input,
            })
            if (response.data.run.stderr) {
                setOutput(response.data.run.stderr)
            } else {
                setOutput(response.data.run.stdout)
            }
            setIsRunning(false)
            toast.dismiss()
        } catch (error) {
            console.error(error.response.data)
            console.error(error.response.data.error)
            setIsRunning(false)
            toast.dismiss()
            toast.error("Failed to run the code")
        }
    }

    return (
        <RunCodeContext.Provider
            value={{
                setInput,
                output,
                isRunning,
                supportedLanguages,
                selectedLanguage,
                setSelectedLanguage,
                runCode,
            }}
        >
            {children}
        </RunCodeContext.Provider>
    )
}

RunCodeContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export { RunCodeContextProvider }
export default RunCodeContext
