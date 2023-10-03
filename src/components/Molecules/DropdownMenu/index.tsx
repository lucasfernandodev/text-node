import { memo, useCallback } from 'react'
import style from './style.module.css'
import { Button } from '@components/Atoms/Button'
import { merge } from '@utils/merge'
import { Portal as PortalDefault } from '@components/Atoms/Portal'
interface Props {
  children: React.ReactNode
  className?: string
}

const Root: React.FC<Props> = ({ children }) => {
  return (
    <div className={merge([style.root, 'surface-ignore'])}>
      {children}
    </div>
  )
}


interface PortalProps extends Props {
  onBlur: () => void,
  open: boolean
}

const Portal: React.FC<PortalProps> = ({
  children, onBlur, open
}) => {

  const portal = useCallback((ref: HTMLUListElement) => {
    ref && ref.focus()
  }, [])

  if (!open) return null

  return (
    <PortalDefault as="ul" ref={portal}
      tabIndex={0}
      aria-expanded={true}
      data-open={open}
      onBlur={onBlur}
      className={style.portal}>
      {children}
    </PortalDefault>
  )
}



interface TriggerProps extends Props {
  toggleMenu: () => void
}

const Trigger: React.FC<TriggerProps> = ({ children, toggleMenu }) => {
  return (
    <Button aria-haspopup="true" onClick={toggleMenu} className={style.btnTrigger}>
      {children}
    </Button>
  )
}


interface ItemProps extends Props {
  onClick?: (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  command?: () => void
}

const Item: React.FC<ItemProps> = ({ children, onClick, command }) => {

  function onClickHandle(ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    ev.preventDefault()
    ev.stopPropagation()
    onClick && onClick(ev)
    command && command()
  }

  return (
    <li className={style.item}>
      <a href="#" onClick={onClickHandle}>
        {children}
      </a>
    </li >
  )
}


const Icon: React.FC<Props> = ({ children }) => <div className={style.icon}>{children}</div>

const Divider = () => <div className={style.divider} />

const MemoizedPortal = memo(Portal)
const MemoizedItem = memo(Item)
const MemoizedIcon = memo(Icon)
const MemoizedDivider = memo(Divider)

export const DropdownMenu = Object.freeze({
  Root,
  Trigger,
  Item: MemoizedItem,
  Portal: MemoizedPortal,
  Icon: MemoizedIcon,
  Divider: MemoizedDivider
})
