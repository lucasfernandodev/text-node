import { ReactNode } from "react"
import { DialogContext } from "./DialogContext"

interface dialogContext {
  dialog: string | null,
  setDialog: (value: string | null) => void
}

interface DialogProviderProps {
  children: ReactNode,
  context: dialogContext
}


export const DialogProvider: React.FC<DialogProviderProps> = ({ children, context }) => {
  return <DialogContext.Provider value={context}>{children}</DialogContext.Provider>
}
