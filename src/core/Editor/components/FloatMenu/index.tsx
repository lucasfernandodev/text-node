import { Editor, FloatingMenu as FloatingMenuDefault } from "@tiptap/react"
import { EditorState } from '@tiptap/pm/state';
import { TbH1, TbH2, TbH3 } from 'react-icons/tb';
import { RiCodeSSlashLine, RiDoubleQuotesL, RiListCheck } from 'react-icons/ri';
import { RxDividerHorizontal } from 'react-icons/rx'
import { SlashMenuItem } from '@components/Molecules/SlashMenu/SlashMenuItem';
import { SlashMenu } from '@components/Molecules/SlashMenu'
import { useState } from "react";
import { fixOverflowErrorPlugin } from "@utils/tippy/plugins/fixOverflowError";
import { keyboardNavigation } from "@utils/tippy/plugins/keyboardNavigation";

interface FloatMenuProps {
  editor: Editor,
  toggleVisibility: (value: boolean) => void,
  slash: boolean
}


export const FloatMenu: React.FC<FloatMenuProps> = ({ editor, slash, toggleVisibility }) => {

  const [lastPosition, setLastPosition] = useState<number | null>(null)

  function shouldShow({ state }: { state: EditorState }) {

    setLastPosition(state.selection.$head.pos)

    const { $from } = state.selection
    const currentLineText = $from.nodeBefore?.textContent
    const result = currentLineText === '/'
    const node = state.selection.$head.parent
    const currentContent = node.textContent.replaceAll("/", "")
    return currentContent.length === 0 ? result : false
  }


  const tippyOptions = {
    onHidden() {
      toggleVisibility(false)
    },
    onShown(){
      let timer: ReturnType<typeof setTimeout> | null = null;
      timer = setTimeout(() => {
        const slashWrapper = document.querySelector('.slashMenu') as HTMLElement
        if(slashWrapper){
          const item = slashWrapper.firstChild as HTMLElement
          item && item.focus()
          clearTimeout(timer as unknown as number)
        }
      }, 250)
    },
    onHide() {
      editor.chain().focus(lastPosition).run()
      toggleVisibility(false)
    },
    plugins: [fixOverflowErrorPlugin, keyboardNavigation]
  }


  return (
    <FloatingMenuDefault tippyOptions={tippyOptions} editor={editor} shouldShow={shouldShow}>{slash && (
      <SlashMenu>
        <SlashMenuItem Icon={TbH1} editor={editor} run='heading1'>
          Heading 1
        </SlashMenuItem>
        <SlashMenuItem Icon={TbH2} editor={editor} run='heading2'>
          Heading 2
        </SlashMenuItem>
        <SlashMenuItem Icon={TbH3} editor={editor} run='heading3'>
          Heading 3
        </SlashMenuItem>
        <SlashMenuItem Icon={RiDoubleQuotesL} editor={editor} run='quote'>
          Quote
        </SlashMenuItem>
        <SlashMenuItem Icon={RiListCheck} editor={editor} run='bulletList'>
          List
        </SlashMenuItem>
        <SlashMenuItem Icon={RiCodeSSlashLine} editor={editor} run='codeBlock'>
          Code Block
        </SlashMenuItem>
        <SlashMenuItem Icon={RxDividerHorizontal} editor={editor} run='divider'>
          Divider
        </SlashMenuItem>
      </SlashMenu>
    )}
    </FloatingMenuDefault>
  )
}
