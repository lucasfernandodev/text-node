import style from './style.module.css';
import { Editor } from "@tiptap/react"
import { ComponentType, HTMLAttributes } from "react"
import { IconBaseProps } from 'react-icons';
import { allowedElements, toggleElements } from '@utils/tiptap/slashMenu/toggleElements';
import { merge } from '@utils/merge';

interface ISlashMenuItem extends HTMLAttributes<HTMLButtonElement> {
  editor: Editor,
  children: React.ReactNode,
  Icon: ComponentType<IconBaseProps>,
  run: allowedElements
}

export const SlashMenuItem: React.FC<ISlashMenuItem> = ({ children, Icon, editor, run, ...rest }) => {
  function onClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    toggleElements({ editor, el: run })
    rest.onClick && rest.onClick(e)
  }

  return (
    <button {...rest} onClick={onClick} className={merge([style.slashMenuItem, rest.className])}>
      <span className={style.icon}>
        <Icon />
      </span>
      {children}
    </button>
  )
}
