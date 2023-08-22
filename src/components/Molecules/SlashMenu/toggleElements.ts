import { Editor } from "@tiptap/react";

export type allowedElements = 'heading1' | 'heading2' | 'heading3' | 'quote' | 'bulletList' | 'codeBlock'

interface IToggleElements {
  el: allowedElements,
  editor: Editor
}

export const toggleElements = ({ el, editor }: IToggleElements) => {
  switch (el) {
    case 'heading1':
      editor.chain().focus().toggleHeading({ level: 1 }).run()
      break;
    case 'heading2':
      editor.chain().focus().toggleHeading({ level: 2 }).run()
      break;
    case 'heading3':
      editor.chain().focus().toggleHeading({ level: 3 }).run()
      break;
    case 'quote':
      editor.chain().focus().toggleBlockquote().run()
      break;
    case 'bulletList':
      editor.chain().focus().toggleBulletList().run()
      break;
    case 'codeBlock':
      editor.chain().focus().toggleCodeBlock().run()
      break;
  }
}
