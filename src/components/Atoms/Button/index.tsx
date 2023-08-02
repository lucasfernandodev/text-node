import { HTMLAttributes, ReactNode } from 'react';
import style from './style.module.css';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

const Button: React.FC<Props> = (props) => {
  return (
    <button  {...props} className={[style.btn, props.className].join(" ")}>{props.children}</button>
  )
}

export { Button }
