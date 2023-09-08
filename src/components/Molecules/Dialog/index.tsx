import { Portal } from '../../Atoms/Portal'
import style from './style.module.css'

interface Props {
  children: React.ReactNode
  className?: string
}

interface RootProps extends Props {
  open?: boolean
}

const Box: React.FC<Props> = ({ children }) => {
  return <Portal className={style.box}>{children}</Portal>
}

const Root: React.FC<RootProps> = ({ children, open = false }) => {
  return <div data-open={open} className={style.dialog}>{children}</div>
}

export const Dialog = Object.freeze({ Box, Root })
