import { ReactNode } from "react"
import { DialogContext } from "./DialogContext"

interface Context {
  dialog: string | null,
  setDialog: (value: string) => void
}

interface DialogProviderProps {
  children: ReactNode,
  context: Context
}


export const DialogProvider: React.FC<DialogProviderProps> = ({ children, context }) => {
  return <DialogContext.Provider value={context}>{children}</DialogContext.Provider>
}
