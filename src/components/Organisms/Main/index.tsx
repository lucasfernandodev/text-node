import style from './style.module.css';
import { LuChevronsRight } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { Timeago } from '../../Atoms/Timeago';
import { DialogExport } from '../DialogExport';
import { Menu } from '../Menu';
import { Button } from '../../Atoms/Button';
import { useDialog } from '../../../context/Dialog/useDialog';
import { DialogDelete } from '../DialogDelete';
import { TbArrowsDiagonal, TbArrowsDiagonalMinimize2 } from 'react-icons/tb';

interface MainProps {
  children: React.ReactNode
  isNaviOpen: boolean
  showNavi: () => void
  title: string,
  updateAt: string | null,
  closeModal: () => void,
  changeExpandedOption: () => void
  isExpanded: boolean
}

export const Main: React.FC<MainProps> = ({
  updateAt,
  showNavi,
  title,
  children,
  isNaviOpen,
  changeExpandedOption,
  isExpanded
}) => {

  const { dialog } = useDialog()
  const [currentTitle, setCurrentTitle] = useState(title)

  useEffect(() => {
    if (title !== currentTitle) {
      setCurrentTitle(title)
    }
  }, [currentTitle, title])

  return (
    <>
      <main className={style.main} data-navigation-visibility={isNaviOpen}>
        <header className={style.header}>
          <Button
            data-navigation-is-open={isNaviOpen}
            onClick={showNavi}
            className={style.btnToggleNavigation}>
            <LuChevronsRight />
          </Button>
          <h3 className={style.title}>
            {title}
          </h3>
          <Menu />
        </header>
        <section className={style.content}>
          {children}
        </section>
        <footer className={style.footer}>
        <Button className={style['btn-expanded']} onClick={changeExpandedOption}>
            {isExpanded ? <TbArrowsDiagonalMinimize2 /> : <TbArrowsDiagonal />}
          </Button>
          {updateAt !== null && <Timeago time={updateAt} />}
        </footer>
      </main >
      {dialog === 'export' && <DialogExport />}
      {dialog === 'delete' && <DialogDelete />}
    </>
  )
}
