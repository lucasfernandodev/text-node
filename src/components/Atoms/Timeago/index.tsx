import style from './style.module.css';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ReactTimeAgo from "react-time-ago"

TimeAgo.addLocale(en)

const Timeago: React.FC<{ time: string }> = ({ time }) => {
  return <p className={style.time}>Edited <ReactTimeAgo date={Date.parse(time)} locale="en-US" /></p>
}

export { Timeago }
