import { memo, useCallback, useEffect, useRef } from 'react'
import style from './style.module.css'
import { Button } from '../../Atoms/Button'

interface Props {
  children: React.ReactNode
  className?: string
}

interface TriggerProps extends Props {
  toggleMenu: () => void
}

interface PortalProps extends Props {
  onBlur: () => void,
  open: boolean
}

interface ItemProps extends Props {
  onClick?: (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const Root: React.FC<Props> = ({ children }) => {
  return (<div className={style.root}>{children}</div>)
}


const Portal: React.FC<PortalProps> = ({
  children, onBlur, open
}) => {
  const portalRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (portalRef.current) {
      portalRef.current.focus()
    }
  }, [portalRef.current])

  if (!open) return null

  return (
    <ul ref={portalRef}
      tabIndex={0}
      aria-expanded={true}
      data-open={true}
      onBlur={onBlur}
      className={style.portal}>
      {children}
    </ul>
  )
}




const Trigger: React.FC<TriggerProps> = ({ children, toggleMenu }) => {

  return (
    <Button aria-haspopup="true" onClick={toggleMenu} className={style.btn}>
      {children}
    </Button>
  )
}




const Item: React.FC<ItemProps> = ({ children, onClick }) => {

  function handle(ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    ev.preventDefault()
    ev.stopPropagation()
    onClick && onClick(ev)
  }

  return (
    <li className={style.item}>
      <a href="#" onClick={handle}>
        {children}
      </a>
    </li >
  )
}



const Icon: React.FC<Props> = ({ children }) => <div className={style.icon}>{children}</div>



const MemoizedPortal = memo(Portal)
const MemoizedItem = memo(Item)
const MemoizedIcon = memo(Icon)

export const DropdownMenu = Object.freeze({
  Root,
  Trigger,
  Item: MemoizedItem,
  Portal: MemoizedPortal,
  Icon: MemoizedIcon
})
