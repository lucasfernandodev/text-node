import React, { ReactNode, createContext, useContext, useState } from "react";

interface Context {
  dialog: string | null,
  setDialog: (value: string) => void
}

const DialogContext = createContext<Context>({} as Context)

export const useDialogContext = () => useContext(DialogContext)

interface DialogProviderProps {
  children: ReactNode,
  context: Context
}

export const DialogContextProvider: React.FC<DialogProviderProps> = ({ children, context }) => {
  const [id, setId] = useState<null | string>(null)

  return <DialogContext.Provider value={context}>{children}</DialogContext.Provider>
}
