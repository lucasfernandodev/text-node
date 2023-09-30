import style from './style.module.css';
import { NodeViewWrapper } from "@tiptap/react"
import {useRef } from 'react';
import { TbPhoto } from "react-icons/tb"

export const ImageBaseComponent = () => {

  const ref = useRef<HTMLDivElement>(null)

  function handle() {
    if(ref.current){
      const self = ref.current;
      const state = self.getAttribute('data-show-menu')
      const newState = state === 'true' ? 'false' : 'true'
      self.setAttribute('data-show-menu', newState)
    }
  }

  return (
    <NodeViewWrapper>
      <div ref={ref} data-show-menu="false" className="image-base" onClick={handle} tabIndex={0}>
        <TbPhoto className={style.icon} />
      </div>
    </NodeViewWrapper>
  )
}