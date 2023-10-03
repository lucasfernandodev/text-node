import { createContext } from "react"

export interface NoteContext {
  id: string | null,
  changeNoteId: (value: string) => void
}

export const NoteContext = createContext<NoteContext>({} as NoteContext)
