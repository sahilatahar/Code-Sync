declare module "lang-map" {
    export function languages(extension: string): string[]
    export function extensions(language: string): string[]
    interface LangMap {
        languages: { [key: string]: string[] }
        extensions: { [key: string]: string[] }
    }

    const langMap: {
        (): LangMap
        languages: typeof languages
        extensions: typeof extensions
    }

    export default langMap
}
