import { createContext } from "react"

export interface Context {
  dialog: string | null,
  setDialog: (value: string) => void
}

export const DialogContext = createContext<Context>({} as Context)
