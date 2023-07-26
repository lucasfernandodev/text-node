import { FaBold, FaItalic, FaStrikethrough, FaCode } from 'react-icons/fa'
import { BubbleMenu as BubbleMenuDefault, Editor } from '@tiptap/react'
import style from './style.module.css'

export const BubbleMenu = ({ editor }: { editor: Editor }) => {
  return (
    <BubbleMenuDefault editor={editor} className={style.bubbleMenu}
      shouldShow={({ state, }) => {
        const { $head } = state.selection
        const isEmptySelection = state.selection.empty

        if (isEmptySelection) return false
        return $head.parent.type.name !== 'title'
      }}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? style.active : ''}
      >
        <FaBold size={12} strokeWidth={1} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? style.active : ''}
      >
        <FaItalic size={12} strokeWidth={1} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? style.active : ''}
      >
        <FaStrikethrough size={12} strokeWidth={1} />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={editor.isActive('code') ? style.active : ''}
      >
        <FaCode size={12} strokeWidth={1} />
      </button>
    </BubbleMenuDefault>
  )
}
