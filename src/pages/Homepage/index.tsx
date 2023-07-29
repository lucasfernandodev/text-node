import { useEffect, useState, lazy } from "react"
import { communication, CommunicationProps, } from "../../core/chrome/communication";
import { nanoid } from "nanoid";
import { Container } from "../../components/Atoms/Container";

const HomepageTemplate = lazy(() => import('../../components/Templates/Modal'))

interface data {
  editor: { id?: string, command: string }
}

export const Homepage = () => {

  const [noteId, setNoteId] = useState(nanoid())
  const [command, setCommand] = useState<null | string>(null)

  useEffect(() => {
    function listener({ data, source, subject }: CommunicationProps<data>) {
      if (source === 'service_worker' && subject === 'contextmenu:editor') {
        if (data.editor.command === 'new') {
          setCommand(data.editor.command)
          setNoteId(nanoid())
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

  return (
    <Container>
      {command && <HomepageTemplate closeModal={() => setCommand(null)} noteId={noteId} />}
    </Container>
  )
}
