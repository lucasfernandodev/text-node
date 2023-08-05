import { createContext } from "react"

export interface NoteContext {
  id: string | null,
  changeId: (value: string) => void
}

export const NoteContext = createContext<NoteContext>({} as NoteContext)
