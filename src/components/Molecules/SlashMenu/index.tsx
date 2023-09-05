import style from './style.module.css';

interface ISlashMenu {
  children: React.ReactNode,
}

export const SlashMenu: React.FC<ISlashMenu> = ({ children }) => (
  <div tabIndex={0} className={[style.wrapper, 'slashMenu'].join(" ")}>
    {children}
  </div>
)
