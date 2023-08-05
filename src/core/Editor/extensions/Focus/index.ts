import focus from '@tiptap/extension-focus'
import style from '../../style.module.css';

export const Focus = [
  focus.configure({
    className: style['has-focus'],
    mode: 'all',
  }),
]
