import { merge } from '../../../utils/merge';
import style from './style.module.css';
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode,
}

const Container: React.FC<Props> = (props) => {
  return <div className={merge([style.container, props?.className])}{...props}>{
    props.children ? props.children : ''
  }</div>
}

export { Container };
