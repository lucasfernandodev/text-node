import style from './style.module.css';
import { LuChevronsRight, LuFileUp, LuMoreHorizontal } from 'react-icons/lu';
import { TbDownload, TbFileX, TbSquareRoundedPlus } from 'react-icons/tb'
import { DropdownMenu } from '../../Molecules/DropdownMenu';
import { useEffect, useState } from 'react';
import { Timeago } from '../../Atoms/Timeago';
import { DialogExport } from '../DialogExport';
import { useDialogContext } from '../../../context/DialogsContext';
import { Menu } from '../Menu';
import { Button } from '../../Atoms/Button';

interface MainProps {
  children: React.ReactNode
  isNaviOpen: boolean
  showNavi: () => void
  title: string,
  updateAt: string | null,
  closeModal: () => void
}

export const Main: React.FC<MainProps> = ({
  updateAt,
  showNavi,
  title,
  children,
  isNaviOpen,
  closeModal
}) => {

  const { dialog } = useDialogContext()
  const [currentTitle, setCurrentTitle] = useState(title)

  useEffect(() => {
    if (title !== currentTitle) {
      setCurrentTitle(title)
    }
  }, [title])

  return (
    <>
      <main className={style.main} data-navigation-visibility={isNaviOpen}>
        <header className={style.header}>
          <Button data-navigation-is-open={isNaviOpen} onClick={showNavi} className={style['btn-toggle-navigation']}>
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
          {updateAt !== null && <Timeago time={updateAt} />}
        </footer>
      </main >
      {dialog === 'export' && <DialogExport />}
    </>
  )
}
