import React, { HTMLAttributes, ReactNode, useEffect, useRef } from "react";
import style from './style.module.css'
import { Container } from "../../Atoms/Container";
import { merge } from "@utils/merge";

interface Props extends HTMLAttributes<HTMLDetailsElement> {
  children: ReactNode,
  open: boolean
}

interface PropsSummary extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

const Root: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDetailsElement>(null)

  useEffect(() => {

    const details = ref.current;
    const summary = ref.current?.querySelector('summary')
    const wrapper: HTMLUListElement | null | undefined = ref.current?.querySelector(`.${style.content}`)

    let animation: null | Animation = null;
    let isClosing = false;
    let isExpanding = false;

    const onAnimationFinish = (open: boolean) => {
      if (details !== null && summary && wrapper) {
        if (open === false) {
          details.removeAttribute('open')
        } else {
          details.setAttribute("open", "")
        }

        animation = null
        isClosing = false
        isExpanding = false
        details.style.height = details.style.overflow = ''
      }
    }

    const expand = () => {
      if (details !== null && summary && wrapper) {

        isExpanding = true;

        const startHeight = `${details.offsetHeight}px`
        const endHeight = `${summary.offsetHeight + wrapper.offsetHeight}px`

        if (animation) {
          animation.cancel()
        }

        animation = details.animate({
          height: [startHeight, endHeight]
        }, {
          duration: 400,
          easing: 'ease-out'
        })

        animation.onfinish = () => onAnimationFinish(true)
        animation.oncancel = () => isExpanding = false
      }
    }

    const open = () => {
      if (details !== null && summary && wrapper) {

        details.style.height = `${details?.offsetHeight}px`
        details.setAttribute("open", "")

        window.requestAnimationFrame(() => expand())
      }
    }


    const shrink = () => {
      if (details !== null && summary && wrapper) {

        isClosing = true
        const startHeight = `${details?.offsetHeight}px`
        const endHeight = `${summary?.offsetHeight}px`

        if (animation) {
          animation.cancel()
        }

        animation = details.animate({
          height: [startHeight, endHeight]
        }, {
          duration: 400,
          easing: 'ease-out'
        }
        )

        animation.onfinish = () => onAnimationFinish(false)
        animation.oncancel = () => isClosing = false

      }
    }

    const onClick = (e: MouseEvent) => {
      e.preventDefault()
      if (details && details !== null) {
        details.style.overflow = 'hidden'
        if (isClosing || !details.open) {
          open()
        } else if (isExpanding || details.open) {
          shrink()
        }
      }
    }

    summary?.addEventListener('click', onClick)

    return () => {
      summary?.removeEventListener('click', onClick)
    }
  }, [])


  return <details {...props} ref={ref} open={props.open}>{props.children}</details>
};

const Summary: React.FC<PropsSummary> = (props) => {
  return <summary {...props}>{props.children}</summary>
}

const Content: React.FC<PropsSummary> = (props) => {
  return <Container {...props} className={merge([props.className, style.content])}>
    {props.children}
  </Container>
}

export const Details = Object.freeze({ Root, Summary, Content })
