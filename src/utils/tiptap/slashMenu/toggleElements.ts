
import { Editor } from "@tiptap/react";

export type allowedElements = 'imageBase' | 'divider' | 'heading1' | 'heading2' | 'heading3' | 'quote' | 'bulletList' | 'codeBlock'

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
      command.toggleCodeBlock({ language: 'typescript' }).run()
      break;
    case 'imageBase':
      editor.chain().selectParentNode().command(({tr,chain,state, dispatch}) => {
        const pos = state.selection.$anchor.pos
        const imageBase = editor.schema.node('ImageBase')
        const transaction = tr.replaceSelectionWith(imageBase)
        dispatch && dispatch(transaction)
        chain().focus(pos).run()
        return true
      }).run()
      editor.chain().focus().command(({state}) => {
        const node = editor.view.nodeDOM(state.selection.anchor) as HTMLElement
        if(node){
          node.querySelector('.image-base[data-show-menu="false"]')?.setAttribute('data-show-menu', "true")
        }
        return true
      }).run()
      break;
    case 'divider':

      try {
        if (editor.can().setHorizontalRule()) {
          editor.chain().command(({ tr, dispatch }) => {
            const divider = editor.schema.node('hr')
            const transaction = tr.replaceSelectionWith(divider)
            dispatch && dispatch(transaction)
            return true
          }).run()
        }
      } catch (error) {
        editor.chain().selectParentNode().command(({ chain, state }) => {
          const pos = state.selection.$anchor.pos
          chain().createParagraphNear().run()
          chain().setNodeSelection(pos).setHorizontalRule().run()
          return true
        }).focus().run()
      }
  }
}
