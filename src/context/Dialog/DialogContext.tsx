import { createContext } from "react"

export interface Context {
  dialog: string | null,
  setDialog: (value: string | null) => void
}

export const DialogContext = createContext<Context>({} as Context)
