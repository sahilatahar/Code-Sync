import { RemoteUser } from "@/types/user"
import { StateField, StateEffect } from "@codemirror/state"
import { EditorView, Decoration, DecorationSet, WidgetType } from "@codemirror/view"

// State effect to update remote users
export const updateRemoteUsers = StateEffect.define<RemoteUser[]>()

// Generate a consistent color for each user based on their username
function getUserColor(username: string): string {

    const colors = [
        "#FF0000", // Bold Red
        "#008080", // Bold Teal
        "#0000FF", // Bold Blue
        "#008000", // Bold Green
        "#FFD700", // Bold Yellow (Gold)
        "#800080", // Bold Purple
        "#00CED1", // Bold Mint (Dark Turquoise)
        "#FFA500", // Bold Orange
        "#9932CC", // Bold Medium Purple
        "#1E90FF", // Bold Dodger Blue
    ];
    
    let hash = 0
    for (let i = 0; i < username.length; i++) {
        hash = username.charCodeAt(i) + ((hash << 5) - hash)
    }
    return colors[Math.abs(hash) % colors.length]
}

// Cursor widget class
class CursorWidget extends WidgetType {
    constructor(private user: RemoteUser) {
        super()
    }

    eq(other: CursorWidget) {
        return this.user.username === other.user.username &&
               this.user.typing === other.user.typing
    }

    toDOM() {
        const color = getUserColor(this.user.username)
        const cursor = document.createElement("span")
        cursor.className = "cm-remote-cursor"
        cursor.style.cssText = `
            position: absolute;
            width: 2px;
            height: 1.2em;
            background-color: ${color};
            border-radius: 1px;
            pointer-events: none;
            z-index: 10;
            animation: cursor-blink 1s infinite;
        `

        // Add username label
        const label = document.createElement("span")
        label.className = "cm-remote-cursor-label"
        label.textContent = this.user.username
        label.style.cssText = `
            position: absolute;
            top: -20px;
            left: 0;
            background-color: ${color};
            color: white;
            padding: 2px 6px;
            border-radius: 3px;
            font-size: 11px;
            font-weight: 500;
            white-space: nowrap;
            pointer-events: none;
            z-index: 11;
            opacity: ${this.user.typing ? '1' : '0.7'};
            transition: opacity 0.3s ease;
        `

        cursor.appendChild(label)
        return cursor
    }
}

// Create cursor decoration
function createCursorDecoration(user: RemoteUser, pos: number) {
    return Decoration.widget({
        widget: new CursorWidget(user),
        side: 1,
    }).range(pos)
}

// Create selection decoration
function createSelectionDecoration(user: RemoteUser, from: number, to: number) {
    const color = getUserColor(user.username)

    return Decoration.mark({
        class: "cm-remote-selection",
        attributes: {
            style: `
                background-color: ${color}33;
                border-left: 2px solid ${color};
                border-radius: 2px;
            `
        }
    }).range(from, to)
}

// State field for managing remote user decorations
export const remoteUsersField = StateField.define<DecorationSet>({
    create() {
        return Decoration.none
    },
    
    update(decorations, tr) {
        // Map existing decorations through document changes
        decorations = decorations.map(tr.changes)
        
        // Handle remote user updates
        for (const effect of tr.effects) {
            if (effect.is(updateRemoteUsers)) {
                const users = effect.value
                const newDecorations: any[] = []

                for (const user of users) {
                    // Only show decorations for users in the same file and who are typing or have selections
                    if (!user.typing && !user.selectionStart && !user.selectionEnd) {
                        continue
                    }

                    // Add selection decoration first (if exists) since it might start before cursor
                    if (user.selectionStart !== undefined && user.selectionEnd !== undefined &&
                        user.selectionStart !== user.selectionEnd) {
                        const from = Math.min(user.selectionStart, tr.newDoc.length)
                        const to = Math.min(user.selectionEnd, tr.newDoc.length)
                        if (from < to) {
                            newDecorations.push(createSelectionDecoration(user, from, to))
                        }
                    }

                    // Add cursor decoration
                    if (user.cursorPosition >= 0) {
                        const cursorPos = Math.min(user.cursorPosition, tr.newDoc.length)
                        newDecorations.push(createCursorDecoration(user, cursorPos))
                    }
                }

                // Sort decorations by from, then by startSide
                newDecorations.sort((a, b) => {
                    const diff = a.from - b.from
                    if (diff !== 0) return diff
                    const aSide = a.value?.spec?.startSide || 0
                    const bSide = b.value?.spec?.startSide || 0
                    return aSide - bSide
                })
                return Decoration.set(newDecorations, true)
            }
        }
        
        return decorations
    },
    
    provide: f => EditorView.decorations.from(f)
})

// Base theme for remote user highlighting
export const remoteUserTheme = EditorView.baseTheme({
    ".cm-remote-cursor": {
        position: "relative",
        display: "inline-block",
    },
    
    ".cm-remote-selection": {
        position: "relative",
    },
    
    "@keyframes cursor-blink": {
        "0%, 50%": { opacity: "1" },
        "51%, 100%": { opacity: "0" }
    }
})

// Extension factory function
export function collaborativeHighlighting() {
    return [
        remoteUsersField,
        remoteUserTheme
    ]
}