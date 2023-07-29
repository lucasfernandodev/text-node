import { JSONContent } from "@tiptap/react";

export interface INote {
  id: string,
  title: string,
  site: string,
  updateAt?: string,
  createAt: string,
  content: JSONContent,
}
