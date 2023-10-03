import { lazy } from "react"
import { Container } from "@components/Atoms/Container";
import { DialogProvider } from "@context/Dialog/DialogProvider";
import { NoteProvider } from "@context/Notes/NoteProvider";
import { useNoteIdGenerator } from "@hook/useNoteIdGenerator";

const OverlayEditorTemplate = lazy(() => import('../../components/Templates/OverlayEditor'))

export const OverlayEditor = () => {

  const { notes, command, dialog } = useNoteIdGenerator()
  const isOverlayerShow = command.id && dialog.name !== 'close' ? true : false

  return (
    <Container>
      <DialogProvider context={{ dialog: dialog.name, setDialog: dialog.set }}>
        <NoteProvider context={{ changeNoteId: notes.set, id: notes.id }}>
          {isOverlayerShow && <OverlayEditorTemplate noteId={notes.id} />}
        </NoteProvider>
      </DialogProvider>
    </Container >
  )
}
