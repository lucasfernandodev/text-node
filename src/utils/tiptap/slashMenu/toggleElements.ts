
import { Editor } from "@tiptap/react";

export type allowedElements = 'heading1' | 'heading2' | 'heading3' | 'quote' | 'bulletList' | 'codeBlock'

interface IToggleElements {
  el: allowedElements,
  editor: Editor
}

export const toggleElements = ({ el, editor }: IToggleElements) => {

  const EMPTY_PARAGRAPH_CONTENT = '\u00A0';

  const command = editor.chain().focus().selectParentNode().command(({ tr, editor, dispatch }) => {
    const textNode = editor.schema.text(EMPTY_PARAGRAPH_CONTENT)
    const transaction = tr.replaceSelectionWith(textNode)
    dispatch && dispatch(transaction)

    return true
  })

  switch (el) {
    case 'heading1':
      command.toggleHeading({ level: 1 }).run()
      break;
    case 'heading2':
      command.toggleHeading({ level: 2 }).run()
      break;
    case 'heading3':
      command.toggleHeading({ level: 3 }).run()
      break;
    case 'quote':
      command.toggleBlockquote().run()
      break;
    case 'bulletList':
      command.toggleBulletList().run()
      break;
    case 'codeBlock':
      command.toggleCodeBlock().run()
      break;
  }
}
