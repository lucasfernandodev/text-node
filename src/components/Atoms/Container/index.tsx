import style from './style.module.css';
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode,
}

const Container: React.FC<Props> = (props) => {
  return <div className={[style.container, props?.className].join(" ")}{...props}>{
    props.children ? props.children : ''
  }</div>
}

export { Container };
