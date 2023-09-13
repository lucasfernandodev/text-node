import { merge } from '@utils/merge';
import style from './style.module.css';
import { HTMLAttributes, ReactNode } from 'react';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

const Button: React.FC<Props> = (props) => {
  return (
    <button  {...props} className={merge([style.btn, props.className])}>{props.children}</button>
  )
}

export { Button }
