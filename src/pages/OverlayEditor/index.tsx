import { nanoid } from "nanoid";
import { useEffect, useState, lazy } from "react"
import { communication, CommunicationProps, } from "../../core/chrome/communication";
import { Container } from "../../components/Atoms/Container";
import { DialogProvider } from "../../context/Dialog/DialogProvider";
import { NoteProvider } from "../../context/Notes/NoteProvider";

const OverlayEditorTemplate = lazy(() => import('../../components/Templates/OverlayEditor'))

interface data {
  editor: { id?: string, command: string }
}

export const OverlayEditor = () => {
  const [noteId, setNoteId] = useState(nanoid())
  const [command, setCommand] = useState<null | string>(null)
  const [dialog, setDialog] = useState<null | string>(null)

  useEffect(() => {
    function listener({ data, source, subject }: CommunicationProps<data>) {
      if (source === 'service_worker' && subject === 'contextmenu:editor') {
        if (data.editor.command === 'new') {
          const id = nanoid();
          setCommand(data.editor.command)
          setNoteId(id)
          setDialog(null)
        }

        if (data.editor.id && data.editor.command === 'open') {
          setNoteId(data.editor.id)
          setCommand(data.editor.command)
          setDialog(null)
        }
      }
    }

    communication.content.listen(listener)

    return () => {
      communication.content.listen(listener, true)
    }
  }, [])

  const removeModal = () => setCommand(null)

  return (
    <Container>
      <DialogProvider context={{ dialog, setDialog }}>
        <NoteProvider context={{ changeId: setNoteId, id: noteId }}>
          {command && dialog !== 'close' && (
            <OverlayEditorTemplate
              removeModal={removeModal}
              noteId={noteId}
            />
          )}
        </NoteProvider>
      </DialogProvider>
    </Container >
  )
}
