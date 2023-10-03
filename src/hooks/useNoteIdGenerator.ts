import { nanoid } from "nanoid"
import { IContextMenuMessage } from "@core/browser/scripts/contextmenu"
import { CommunicationProps, communication } from "@utils/browser/communication"
import { useEffect, useState } from "react"

const useNoteIdGenerator = () => {

  const [noteId, setNoteId] = useState(nanoid())
  const [command, setCommand] = useState<null | string>(null)
  const [dialog, setDialog] = useState<null | string>(null)

  useEffect(() => {
    function listener({ data, source, subject }: CommunicationProps<IContextMenuMessage>) {
      if (source === 'service_worker' && subject === 'contextmenu:event') {
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

  return {
    notes: {
      id:noteId,
      set: setNoteId
    },
    dialog: {
      name: dialog,
      set: setDialog
    },
    command: {
      id: command,
      set: setCommand
    }
  }
}

export {useNoteIdGenerator}