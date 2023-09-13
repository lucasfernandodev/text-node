import { JSONContent } from "@tiptap/react"
import { query } from "../../database/notes"
import { debounce } from "../../utils/debounce"

interface storeNotesProps {
  id: string,
  title: string
  content: JSONContent,
}

interface handleStoreContent {
  setUpdateAt: (date: string) => void,
  content: JSONContent,
  title: string,
  id: string
}

const storeNotesInDB = async ({ content, title, id }: storeNotesProps) => {

  const isContent = await query.notes.get({ id: id })

  if (isContent) return await query.notes.update({
    id: isContent.id, data: {
      id: isContent.id,
      site: isContent.site,
      title: title,
      content: content
    }
  })

  await query.notes.add({data: {
    id: id,
    title: title,
    site: window.location.hostname,
    content: content
  }})
}

export const storageEditor = () => debounce(({ content, title, id, setUpdateAt }: handleStoreContent) => {
  const date = new Date().toISOString()
  storeNotesInDB({ content, title, id }).catch(console.error)
  setUpdateAt(date)
}, 2000)
