import { merge } from '@utils/merge';
import { Portal } from '../../Atoms/Portal';
import style from './style.module.css';

interface ISlashMenu {
  children: React.ReactNode,
}

export const SlashMenu: React.FC<ISlashMenu> = ({ children }) => (
  <Portal tabIndex={0} className={merge([style.wrapper, 'slashMenu'])}>
    {children}
  </Portal>
)
