import style from './style.module.css';
import { useEditor, EditorContent } from '@tiptap/react'
import { FloatMenu } from './components/FloatMenu'
import { BubbleMenu } from './components/BubbleMenu';
import { memo, useEffect, useMemo, useState } from 'react';
import { extensions } from './extensions';
import { query } from '@database/notes';
import { INote } from '../../types/note';
import { storageEditor } from '@utils/tiptap/storeNotesInDB';
import { LinkWidget } from '@components/Molecules/LinkWidget';
import { ImageWidget } from '@components/Molecules/ImageWidget';

interface props {
  noteId: string
  changeTitle: (title: string) => void,
  changeUpdateAt: (time: string) => void,
}

const _Editor = ({ changeTitle, noteId, changeUpdateAt }: props) => {

  const storeEditorContent = useMemo(storageEditor, [])
  const [note, setNote] = useState<INote | null>(null)
  const [slash, setSlash] = useState(false)

  const editor = useEditor({
    extensions: [...extensions],
    content: note?.content ?? '<h1></h1><p></p>',
    editorProps: {
      attributes: {
        class: 'tn-editor',
        id: (style.editor)
      },
      handleKeyPress(view, event) {
        if (event.key === '/') {
          setSlash(true)
        }
        return false
      }
    },

    onUpdate: ({ editor }) => {

      const title = editor?.view.state.doc.firstChild?.textContent.trim() || 'Unitled'

      if (title !== 'Unitled') {
        // Set title in modal
        changeTitle(title)
        storeEditorContent({
          content: editor.getJSON(),
          title: title,
          id: noteId,
          setUpdateAt: changeUpdateAt
        })
      } else {
        changeTitle('Unitled')
      }

      if (editor.isEmpty) {
        editor.commands.setContent('<h1></h1><p></p>')
      }
    }
  })

  useEffect(() => {
    async function setNewContent({ id }: { id: string }) {
      if (noteId !== note?.id && editor) {
        const result = await query.notes.get({ id })
        if (result !== undefined && result !== null) {
          setNote(result)
          editor && editor.commands.setContent(result.content)
          editor && changeTitle(result.title)
        } else {
          setNote(null)
          editor && editor.commands.setContent('<h1></h1><p></p>')
          changeTitle('Unitled')
        }
      }
    }
    setNewContent({ id: noteId }).catch(console.error)

  }, [changeTitle, editor, note, noteId])

  if (!editor) {
    return null
  }

  return (
    <>
      <ImageWidget editor={editor} />
      <BubbleMenu editor={editor} />
      <EditorContent editor={editor} className={style.editor} />
      <LinkWidget editor={editor}/>
      <FloatMenu slash={slash} editor={editor} toggleVisibility={() => setSlash(false)} />
    </>
  )
}

const Editor = memo(_Editor)

export default Editor
