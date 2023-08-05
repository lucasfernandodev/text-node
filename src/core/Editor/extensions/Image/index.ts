import style from './style.module.css'
import image from '@tiptap/extension-image'


export const Image = [
  image.configure({
    HTMLAttributes: {
      class: style.image
    },
  })
]
