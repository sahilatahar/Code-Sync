import useAppContext from "@/hooks/useAppContext"
import useSocket from "@/hooks/useSocket"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import ACTIONS from "@/utils/actions"
import { useCallback, useEffect } from "react"
import { Tldraw, useEditor } from "tldraw"

function DrawingEditor() {
    const { isMobile } = useWindowDimensions()

    return (
        <Tldraw
            inferDarkMode
            forceMobile={isMobile}
            defaultName="Editor"
            className="z-0"
        >
            <ReachEditor />
        </Tldraw>
    )
}

function ReachEditor() {
    const editor = useEditor()
    const { drawingData, setDrawingData } = useAppContext()
    const { socket } = useSocket()

    const handleChangeEvent = useCallback(
        (change) => {
            const snapshot = change.changes
            // Update the drawing data in the context
            setDrawingData(editor.store.getSnapshot())
            // Emit the snapshot to the server
            socket.emit(ACTIONS.DRAWING_UPDATE, { snapshot })
        },
        [editor.store, setDrawingData, socket],
    )

    // Handle drawing updates from other clients
    const handleRemoteDrawing = useCallback(
        ({ snapshot }) => {
            editor.store.mergeRemoteChanges(() => {
                const { added, updated, removed } = snapshot

                for (const record of Object.values(added)) {
                    editor.store.put([record])
                }
                for (const [, to] of Object.values(updated)) {
                    editor.store.put([to])
                }
                for (const record of Object.values(removed)) {
                    editor.store.remove([record.id])
                }
            })

            setDrawingData(editor.store.getSnapshot())
        },
        [editor.store, setDrawingData],
    )

    useEffect(() => {
        // Load the drawing data from the context
        if (drawingData && Object.keys(drawingData).length > 0) {
            editor.store.loadSnapshot(drawingData)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const cleanupFunction = editor.store.listen(handleChangeEvent, {
            source: "user",
            scope: "document",
        })
        // Listen for drawing updates from other clients
        socket.on(ACTIONS.DRAWING_UPDATE, handleRemoteDrawing)

        // Cleanup
        return () => {
            cleanupFunction()
            socket.off(ACTIONS.DRAWING_UPDATE)
        }
    }, [
        drawingData,
        editor.store,
        handleChangeEvent,
        handleRemoteDrawing,
        socket,
    ])

    return null
}

export default DrawingEditor
