import { abcdef } from "@uiw/codemirror-themes-all"
import { abyss } from "@uiw/codemirror-themes-all"
import { androidstudio } from "@uiw/codemirror-themes-all"
import { andromeda } from "@uiw/codemirror-themes-all"
import { atomone } from "@uiw/codemirror-themes-all"
import { aura } from "@uiw/codemirror-themes-all"
import { basicDark } from "@uiw/codemirror-themes-all"
import { basicLight } from "@uiw/codemirror-themes-all"
import { bbedit } from "@uiw/codemirror-themes-all"
import { bespin } from "@uiw/codemirror-themes-all"
import { copilot } from "@uiw/codemirror-themes-all"
import { darcula } from "@uiw/codemirror-themes-all"
import { dracula } from "@uiw/codemirror-themes-all"
import { duotoneDark } from "@uiw/codemirror-themes-all"
import { duotoneLight } from "@uiw/codemirror-themes-all"
import { eclipse } from "@uiw/codemirror-themes-all"
import { githubDark } from "@uiw/codemirror-themes-all"
import { githubLight } from "@uiw/codemirror-themes-all"
import { gruvboxDark } from "@uiw/codemirror-themes-all"
import { gruvboxLight } from "@uiw/codemirror-themes-all"
import { kimbie } from "@uiw/codemirror-themes-all"
import { material } from "@uiw/codemirror-themes-all"
import { materialDark } from "@uiw/codemirror-themes-all"
import { materialLight } from "@uiw/codemirror-themes-all"
import { monokai } from "@uiw/codemirror-themes-all"
import { monokaiDimmed } from "@uiw/codemirror-themes-all"
import { noctisLilac } from "@uiw/codemirror-themes-all"
import { nord } from "@uiw/codemirror-themes-all"
import { okaidia } from "@uiw/codemirror-themes-all"
import { quietlight } from "@uiw/codemirror-themes-all"
import { red } from "@uiw/codemirror-themes-all"
import { solarizedDark } from "@uiw/codemirror-themes-all"
import { solarizedLight } from "@uiw/codemirror-themes-all"
import { sublime } from "@uiw/codemirror-themes-all"
import { tokyoNight } from "@uiw/codemirror-themes-all"
import { tokyoNightDay } from "@uiw/codemirror-themes-all"
import { tokyoNightStorm } from "@uiw/codemirror-themes-all"
import { tomorrowNightBlue } from "@uiw/codemirror-themes-all"
import { vscodeDark } from "@uiw/codemirror-themes-all"
import { whiteDark } from "@uiw/codemirror-themes-all"
import { whiteLight } from "@uiw/codemirror-themes-all"
import { xcodeDark } from "@uiw/codemirror-themes-all"
import { xcodeLight } from "@uiw/codemirror-themes-all"
import { Extension } from "@uiw/react-codemirror"

interface EditorTheme {
    [key: string]: Extension
}

export const editorThemes: EditorTheme = {
    Abcdef: abcdef,
    Abyss: abyss,
    "Android Studio": androidstudio,
    Andromeda: andromeda,
    "Atom One": atomone,
    Aura: aura,
    "Basic Dark": basicDark,
    "Basic Light": basicLight,
    BBEdit: bbedit,
    Bespin: bespin,
    Copilot: copilot,
    Darcula: darcula,
    Dracula: dracula,
    "Duotone Dark": duotoneDark,
    "Duotone Light": duotoneLight,
    Eclipse: eclipse,
    "GitHub Dark": githubDark,
    "GitHub Light": githubLight,
    "Gruvbox Dark": gruvboxDark,
    "Gruvbox Light": gruvboxLight,
    Kimbie: kimbie,
    Material: material,
    "Material Dark": materialDark,
    "Material Light": materialLight,
    Monokai: monokai,
    "Monokai Dimmed": monokaiDimmed,
    "Noctis Lilac": noctisLilac,
    Nord: nord,
    Okaidia: okaidia,
    "Quiet Light": quietlight,
    Red: red,
    "Solarized Dark": solarizedDark,
    "Solarized Light": solarizedLight,
    Sublime: sublime,
    "Tokyo Night": tokyoNight,
    "Tokyo Night Day": tokyoNightDay,
    "Tokyo Night Storm": tokyoNightStorm,
    "Tomorrow Night Blue": tomorrowNightBlue,
    "VS Code Dark": vscodeDark,
    "White Dark": whiteDark,
    "White Light": whiteLight,
    "Xcode Dark": xcodeDark,
    "Xcode Light": xcodeLight,
}
