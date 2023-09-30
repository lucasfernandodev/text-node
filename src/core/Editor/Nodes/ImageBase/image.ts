import { ImageBaseComponent } from '@core/Editor/Nodes/ImageBase'
import {Node} from '@tiptap/core'
import { ReactNodeViewRenderer } from '@tiptap/react'

const ImageBase = Node.create({
  // configuration …
  name: 'ImageBase',
  group: 'block',
  draggable: false,
  selectable: true,

  addNodeView() {
    return ReactNodeViewRenderer(ImageBaseComponent)
  },
})

export default ImageBase