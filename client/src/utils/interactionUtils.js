export const getCursorCoords = () => {
    const cursorElement = document.querySelector(".cm-cursor.cm-cursor-primary")
    const editorElement = document.querySelector(".cm-editor") // Replace ".editor" with the selector for your editor element

    if (!cursorElement || !editorElement) return { x: 0, y: 0 }

    const cursorRect = cursorElement.getBoundingClientRect()
    const editorRect = editorElement.getBoundingClientRect()

    // Calculate the offset of the editor relative to the window
    const editorOffsetX = editorRect.left - window.pageXOffset
    const editorOffsetY = editorRect.top - window.pageYOffset

    // Calculate the cursor coordinates relative to the editor
    const relativeX = cursorRect.left - editorRect.left
    const relativeY = cursorRect.top - editorRect.top

    // Adjust cursor coordinates by editor offsets
    const adjustedX = relativeX + editorOffsetX
    const adjustedY = relativeY + editorOffsetY

    return { x: adjustedX, y: adjustedY }
}