import React, { ElementType, HTMLAttributes, forwardRef } from 'react';
import { merge } from '../../../utils/merge';
import style from './style.module.css';


interface ComponentProps extends HTMLAttributes<HTMLOrSVGElement> {
  as?: ElementType;
}

const Portal = forwardRef((props: ComponentProps, ref) => {
  const { as: Tag = 'div' } = props
  return <Tag ref={ref} {...props} className={merge([props.className, style.portal])}>
    {props.children}
  </Tag>
})

export { Portal }
