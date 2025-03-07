export interface ICopilotContext {
    setInput: (input: string) => void
    output: string
    isRunning: boolean
    generateCode: () => void
}
