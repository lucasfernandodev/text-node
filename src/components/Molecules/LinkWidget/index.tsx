import { Editor, FloatingMenu } from '@tiptap/react'
import style from './style.module.css'
import { Portal } from "@components/Atoms/Portal"
import { PluginKey } from '@tiptap/pm/state'
import { useEffect, useRef, useState } from 'react'
import { LinkWidgetTippyOptions } from './tippyOptions'
import { isUrlValid } from '@utils/checkUrl'
import { merge } from '@utils/merge'


const LinkWidget = ({ editor }: { editor: Editor }) => {

  const ref = useRef(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const root = document.querySelector('#tn-root')
  const editorWrapper = root ? root.querySelector('.editor-canvas') as HTMLElement : null

  useEffect(() => {
    function onClick(e: Event) {
      const el = e.target as HTMLElement
      const isTrigger = el.classList.contains('btn-toggle-LinkWidget') || el.closest('btn-toggle-LinkWidget')

      if (root && editorWrapper) {
        if (isTrigger) {
          const node = editor.view.nodeDOM(editor.view.state.selection.anchor)?.parentNode as HTMLLinkElement

          if(!node || typeof node['href'] === undefined){
            setInputValue('')
            editor.chain().focus().run()
            setIsOpen(!isOpen)
            editorWrapper.style.overflowY = 'hidden'
            return
          }

          if(node.href){
            editor.chain().focus().unsetLink().run()
          }

        } else {
          if (!el.closest('.portal-link')) {
            setIsOpen(false)
            editorWrapper.style.overflowY = 'auto'
          }
        }
      }
    }

    root && root.addEventListener('click', onClick)

    return () => {
      root && root.removeEventListener('click', onClick)
    }
  }, [isOpen, editor, editorWrapper, root])

  useEffect(() => {
    const self = ref.current as HTMLElement | null;

    function handleKeys(e: KeyboardEvent){
      const input = e.target as HTMLInputElement
      if(input){
        const key = e.key
        const value = input.value

        if(key === 'Enter'){
          if(isUrlValid(value)){
            editor.chain().focus().setLink({
              href: value,
              target: '_black'
            }).run()
            setIsOpen(false)
          }
        }

        if(key === 'Escape'){
          setIsOpen(false)
        }
      }
    }

    if(self){
      self.addEventListener('keydown', handleKeys)
    }
  }, [editor, ref])

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setInputValue(value)
    const isValidLink = isUrlValid(value)
    if (!isValidLink) { e.target.classList.add(style.invalid) }
    else {
      e.target.classList.remove(style.invalid)
    }
  }

  return (
    <FloatingMenu
      tippyOptions={LinkWidgetTippyOptions}
      editor={editor}
      shouldShow={() => true}
      pluginKey={new PluginKey('LinkWidget')} >
      <Portal ref={ref} tabIndex={0} className={merge([style.LinkWidth, 'portal-link'])} style={{
        display: isOpen ? 'flex' : 'none'
      }}>
        <input
        ref={inputRef}
          value={inputValue}
          onChange={onChange}
          type="text"
          className={style.input}
          placeholder='Paste your link...'
        />
      </Portal>
    </FloatingMenu>
  )
}

export { LinkWidget }