import { merge } from '../../../utils/merge';
import style from './style.module.css';

interface ISlashMenu {
  children: React.ReactNode,
}

export const SlashMenu: React.FC<ISlashMenu> = ({ children }) => (
  <div tabIndex={0} className={merge([style.wrapper, 'slashMenu'])}>
    {children}
  </div>
)
