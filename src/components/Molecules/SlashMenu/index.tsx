import style from './style.module.css';

interface ISlashMenu{
  children: React.ReactNode
}

export const SlashMenu: React.FC<ISlashMenu> = ({ children }) => {
  return <div className={style.wrapper}>{children}</div>
}
