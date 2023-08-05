import { ComponentProps, ReactNode, useEffect, useRef } from "react"
import { useDragModal } from "../../../hooks/dragModal"

interface Props extends ComponentProps<'section'> {
  children: ReactNode
}

const Modal: React.FC<Props> = ({ ...props }) => {

  const ref = useRef<HTMLElement>(null)
  useDragModal(ref.current)

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  return (
    <section ref={ref} aria-modal="true" role="dialog" tabIndex={-1} {...props}>
      {props.children}
    </section>
  )
}

export { Modal }
