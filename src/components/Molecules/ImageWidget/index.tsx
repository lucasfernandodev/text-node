import { Editor, FloatingMenu } from '@tiptap/react'
import style from './style.module.css'
import { merge } from '@utils/merge'
import { useEffect, useRef, useState } from 'react'
import { EditorState, PluginKey } from '@tiptap/pm/state'
import { ImageWidgetTippyOptions } from './tippyOptions'
import { testImage } from '@utils/testImage'
interface ImageWidgetProps {
  editor: Editor
}

const ImageWidget: React.FC<ImageWidgetProps> = ({ editor }) => {
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [value, setValue] = useState('')
  const root = document.querySelector('.editor-canvas') as HTMLElement
  const ref = useRef<HTMLInputElement>(null)
  const constainerRef = useRef<HTMLDivElement>(null)

  function resetStates(){
    setValue('')
    setIsUrlValid(false)
    ref.current && ref.current.classList.remove(style.invalid)
  }

  function onChangeInpu(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target
    if (input.value.match(/^https?:\/\/.+\/.+$/)) {
      input.classList.remove(style.invalid)
      setIsUrlValid(true)
      setValue(input.value)
    } else {
      input.classList.add(style.invalid)
      setIsUrlValid(false)
      setValue('')
    }
  }

  const tippyOptions = {
    ...ImageWidgetTippyOptions,
    onHide() {
      const menu = root.querySelector('.image-base[data-show-menu="true"]') as HTMLElement
      if (menu) {
        menu.setAttribute('data-show-menu', 'false')
      }
    }
  }

  function shouldShow({ state }: { state: EditorState }) {
    const node = editor.view.nodeDOM(state.selection.anchor) as HTMLElement
    if (node) {
      if (node.classList && node.classList.contains('node-ImageBase')) {
        return root.querySelector('.image-base[data-show-menu="true"]') ? true : false
      }
    }

    return false
  }

  async function processImage() {
    if (isUrlValid) {
      try {

        const result = await testImage(value, 2500);

        if (result.valid === true) {
          editor.chain().focus().command(({ dispatch, chain, state, tr }) => {
            const { selection } = state
            const image = editor.schema.node('image', {
              src: value,
              alt: 'Not Implemented',
              title: 'Not Implemented'
            })
            chain().setNodeSelection(selection.anchor)
            const transaction = tr.replaceSelectionWith(image)
            dispatch && dispatch(transaction)
            return true
          }).run()
          resetStates()
        }
      } catch (error) {
        setIsUrlValid(false)
        ref.current && ref.current.classList.add(style.invalid)
      }
    }
  }

  useEffect(() => {
    resetStates()
  }, [])

  function onClick() {
    processImage().catch(console.error)
  }

  return (
    <FloatingMenu
      editor={editor}
      pluginKey={new PluginKey('ImageWidget')}
      tippyOptions={tippyOptions}
      shouldShow={shouldShow}
    >
      <div className={merge([style.menu, 'dialog-image-insert'])} ref={constainerRef} tabIndex={0}>
        <div className={style.header}>
          <ul className={style.tabs}>
            <li data-status="active" data-target="Embed-Link" className={style.tab}>Embed Link</li>
          </ul>
        </div>
        <div className={style.body}>
          <div className={style.container} data-option="Embed-Link">
            <input value={value} type="text" placeholder="Paste the image link..." onChange={onChangeInpu} ref={ref} />
            <button onClick={onClick}>Embed Image</button>
          </div>
        </div>
      </div>
    </FloatingMenu>
  )
}

export { ImageWidget }