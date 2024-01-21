import { loadLanguage, langNames } from "@uiw/codemirror-extensions-langs"

const editorLanguages = {}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

for (const lang of langNames) {
    editorLanguages[capitalizeFirstLetter(lang)] = loadLanguage(lang)
}

export { editorLanguages }

const fileExtensions = {
    apl: ".apl",
    asciiArmor: ".armor",
    asterisk: ".conf",
    c: ".c",
    csharp: ".cs",
    scala: ".scala",
    solidity: ".sol",
    kotlin: ".kt",
    shader: ".shader",
    nesC: ".nc",
    objectiveC: ".m",
    objectiveCpp: ".mm",
    squirrel: ".nut",
    ceylon: ".ceylon",
    dart: ".dart",
    cmake: ".cmake",
    cobol: ".cob",
    commonLisp: ".lisp",
    crystal: ".cr",
    cypher: ".cypher",
    d: ".d",
    diff: ".diff",
    dtd: ".dtd",
    dylan: ".dylan",
    ebnf: ".ebnf",
    ecl: ".ecl",
    eiffel: ".e",
    elm: ".elm",
    factor: ".factor",
    fcl: ".fcl",
    forth: ".4th",
    fortran: ".f90",
    gas: ".s",
    gherkin: ".feature",
    groovy: ".groovy",
    haskell: ".hs",
    haxe: ".hx",
    http: ".http",
    idl: ".idl",
    jinja2: ".j2",
    mathematica: ".nb",
    mbox: ".mbox",
    mirc: ".mrc",
    modelica: ".mo",
    mscgen: ".msc",
    mumps: ".m",
    nsis: ".nsi",
    ntriples: ".nt",
    octave: ".m",
    oz: ".oz",
    pig: ".pig",
    properties: ".properties",
    protobuf: ".proto",
    puppet: ".pp",
    q: ".q",
    sas: ".sas",
    sass: ".sass",
    liquid: ".liquid",
    mermaid: ".mermaid",
    nix: ".nix",
    svelte: ".svelte",
    sieve: ".sieve",
    smalltalk: ".st",
    solr: ".solr",
    sparql: ".sparql",
    spreadsheet: ".xls",
    stex: ".tex",
    textile: ".textile",
    tiddlyWiki: ".tid",
    tiki: ".tiki",
    troff: ".roff",
    ttcn: ".ttcn",
    turtle: ".ttl",
    velocity: ".vm",
    verilog: ".v",
    vhdl: ".vhd",
    webIDL: ".idl",
    xQuery: ".xq",
    yacas: ".ys",
    z80: ".z80",
    wast: ".wast",
    javascript: ".js",
    jsx: ".jsx",
    typescript: ".ts",
    tsx: ".tsx",
    vue: ".vue",
    angular: ".ng",
    json: ".json",
    html: ".html",
    css: ".css",
    python: ".py",
    markdown: ".md",
    xml: ".xml",
    sql: ".sql",
    mysql: ".sql",
    pgsql: ".pgsql",
    java: ".java",
    rust: ".rs",
    cpp: ".cpp",
    lezer: ".lz",
    php: ".php",
    go: ".go",
    shell: ".sh",
    lua: ".lua",
    swift: ".swift",
    tcl: ".tcl",
    yaml: ".yaml",
    vb: ".vb",
    powershell: ".ps1",
    brainfuck: ".bf",
    stylus: ".styl",
    erlang: ".erl",
    nginx: ".nginx",
    perl: ".pl",
    ruby: ".rb",
    pascal: ".pas",
    livescript: ".ls",
    less: ".less",
    scheme: ".scm",
    toml: ".toml",
    vbscript: ".vbs",
    clojure: ".clj",
    coffeescript: ".coffee",
    julia: ".jl",
    dockerfile: ".dockerfile",
    r: ".r",
}

// Extracting the extensions as an array
const fileExtensionsArray = Object.values(fileExtensions)

export { fileExtensionsArray }

const getFileExtension = (langName) => {
    try {
        return fileExtensions[langName.toLowerCase()]
    } catch (e) {
        console.log(e)
        return null
    }
}

const getLanguageName = (filename) => {
    // extract .js from code.js
    let extension = filename.split(".").pop()
    extension = "." + extension

    try {
        for (const [language, ext] of Object.entries(fileExtensions)) {
            if (ext === extension.toLowerCase()) {
                return capitalizeFirstLetter(language)
            }
        }
    } catch (e) {
        return null
    }
}

export { getFileExtension, getLanguageName }
