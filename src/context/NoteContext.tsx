import React, { ReactNode, createContext, useContext, useState } from "react";

interface Context {
  id: string | null,
  changeId: (value: string) => void
}

const NoteContext = createContext<Context>({} as Context)

export const useNoteContext = () => useContext(NoteContext)

interface NoteContextProviderProps {
  children: ReactNode,
  context: Context
}

export const NoteContextProvider: React.FC<NoteContextProviderProps> = ({ children, context }) => {
  const [id, setId] = useState<null | string>(null)

  function changeId(value: string) {
    setId(value)
  }

  return <NoteContext.Provider value={context}>{children}</NoteContext.Provider>
}
