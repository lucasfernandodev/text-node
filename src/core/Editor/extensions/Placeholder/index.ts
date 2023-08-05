import style from '../../style.module.css'
import placeholder from '@tiptap/extension-placeholder';

export const Placeholder = [placeholder.configure({
  showOnlyCurrent: false,
  emptyNodeClass: `${style.placeholder}`,
  placeholder: ({ node }) => {

    if (node.type.name === 'title') {
      return 'Unitled'
    }

    return 'Press `/` for commands...'
  }
})]
