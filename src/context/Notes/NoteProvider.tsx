import React, { ReactNode } from "react";
import { NoteContext } from "./NoteContext";

interface NoteProviderProps {
  children: ReactNode,
  context: NoteContext
}

export const NoteProvider: React.FC<NoteProviderProps> = ({ children, context }) => {
  return <NoteContext.Provider value={context}>{children}</NoteContext.Provider>
}
