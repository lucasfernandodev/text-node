import { useEffect, useRef } from 'react'
import style from './style.module.css'

interface Props {
  children: React.ReactNode
  className?: string
}

interface TriggerProps extends Props {
  toggleMenu: () => void
}

interface PortalProps extends Props {
  open: boolean,
  onBlur: () => void
}

interface ItemProps extends Props {
  onClick?: (ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const Root: React.FC<Props> = ({ children }) => <div className={style.root}>{children}</div>

const Portal: React.FC<PortalProps> = ({
  children, open, onBlur
}) => {

  const portalRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (portalRef.current && open === true) {
      portalRef.current.focus()
    }
  }, [portalRef, open])

  return <ul ref={portalRef} tabIndex={0} aria-expanded={open} data-open={open} onBlur={onBlur} className={style.portal}>{children}</ul>
}

const Trigger: React.FC<TriggerProps> = ({
  children,
  toggleMenu
}) => <button aria-haspopup="true" onClick={toggleMenu} className={style.btn}>{children}</button>

const Item: React.FC<ItemProps> = ({ children, onClick }) => <li className={style.item}>
  <a href="#" onClick={onClick}>{children}</a>
</li>

const Icon: React.FC<Props> = ({ children }) => <div className={style.icon}>{children}</div>

export const DropdownMenu = Object.freeze({ Root, Trigger, Item, Portal, Icon })
