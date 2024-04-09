import { showTooltip, EditorView } from "@codemirror/view"
import { StateField } from "@codemirror/state"

export function tooltipField(users) {
    return StateField.define({
        create: (state) => getCursorTooltips(state, users),
        update(tooltips, tr) {
            if (!tr.docChanged && !tr.selection) return tooltips
            return getCursorTooltips(tr.state, users)
        },
        provide: (f) => showTooltip.computeN([f], (state) => state.field(f)),
    })
}

export function getCursorTooltips(state, users) {
    return users.map((user) => {
        if (!user.typing) {
            return null
        }
        let text = user.username
        const pos = user.cursorPosition
        if (user) {
            text = user.username
        }

        return {
            pos,
            above: true,
            strictSide: true,
            arrow: true,
            create: () => {
                let dom = document.createElement("div")
                dom.className = "cm-tooltip-cursor"
                dom.textContent = text
                return { dom }
            },
        }
    })
}

export const cursorTooltipBaseTheme = EditorView.baseTheme({
    ".cm-tooltip.cm-tooltip-cursor": {
        backgroundColor: "#66b",
        color: "white",
        border: "none",
        padding: "2px 7px",
        borderRadius: "4px",
        zIndex: "10",
        "& .cm-tooltip-arrow:before": {
            borderTopColor: "#66b",
        },
        "& .cm-tooltip-arrow:after": {
            borderTopColor: "transparent",
        },
    },
})
