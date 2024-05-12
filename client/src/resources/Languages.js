import { loadLanguage, langNames } from "@uiw/codemirror-extensions-langs"

const editorLangExtensions = {}

for (const lang of langNames) {
    editorLangExtensions[lang] = loadLanguage(lang)
}

export { editorLangExtensions }
