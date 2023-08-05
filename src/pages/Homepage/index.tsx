import { useEffect, useState, lazy } from "react"
import { communication, CommunicationProps, } from "../../core/chrome/communication";
import { nanoid } from "nanoid";
import { Container } from "../../components/Atoms/Container";
import { NoteContextProvider, useNoteContext } from "../../context/NoteContext";
import { DialogContextProvider } from "../../context/DialogsContext";

const HomepageTemplate = lazy(() => import('../../components/Templates/Modal'))

interface data {
  editor: { id?: string, command: string }
}

export const Homepage = () => {

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

        }

        if (data.editor.id && data.editor.command === 'open') {
          setNoteId(data.editor.id)
          setCommand(data.editor.command)
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
      <DialogContextProvider context={{ dialog, setDialog }}>
        <NoteContextProvider context={{ changeId: setNoteId, id: noteId }}>
          {command && <HomepageTemplate removeModal={removeModal} noteId={noteId} />}
        </NoteContextProvider>
      </DialogContextProvider>
    </Container >
  )
}
