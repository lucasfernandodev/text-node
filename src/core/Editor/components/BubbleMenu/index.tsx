import style from './style.module.css'
import { FaBold, FaItalic, FaStrikethrough, FaCode } from 'react-icons/fa'
import { BubbleMenu as BubbleMenuDefault, Editor } from '@tiptap/react'
import { Button } from '@components/Atoms/Button'
import { EditorState } from '@tiptap/pm/state'
import { Portal } from '@components/Atoms/Portal'
import { TbArrowUpRight } from 'react-icons/tb'
import { merge } from '@utils/merge'

export const BubbleMenu = ({ editor }: { editor: Editor }) => {

  function shouldShow({ state, }: { state: EditorState }) {
    const { $head } = state.selection
    const isEmptySelection = state.selection.empty
    const type = state.selection.$anchor.node().type
    if (type.name === 'doc') return false
    if (isEmptySelection) return false
    return $head.parent.type.name !== 'title'
  }

  const LinkClassName = `btn-toggle-LinkWidget ${style.btnLink}`

  return (
    <BubbleMenuDefault editor={editor} className={style.bubbleMenu}
      shouldShow={shouldShow}>
      <Portal className='bubbleMenu'>
        <Button 
           className={editor.isActive('link') ? merge([style.btnLink, style.active, 'btn-toggle-LinkWidget']) : LinkClassName}
        >
          <TbArrowUpRight/>
          Link
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? style.active: ''}
        >
          <FaBold size={12} strokeWidth={1} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? style.active : ''}
        >
          <FaItalic size={12} strokeWidth={1} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? style.active : ''}
        >
          <FaStrikethrough size={12} strokeWidth={1} />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? style.active : ''}
        >
          <FaCode size={12} strokeWidth={1} />
        </Button>
      </Portal>
    </BubbleMenuDefault>
  )
}
