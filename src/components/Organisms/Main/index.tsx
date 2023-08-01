import style from './style.module.css';
import { LuChevronsRight, LuFileUp, LuMoreHorizontal } from 'react-icons/lu';
import { TbCloudDownload, TbDownload, TbFileX, TbSquareRoundedPlus } from 'react-icons/tb'
import { DropdownMenu } from '../../Molecules/DropdownMenu';
import { useState } from 'react';
import { Timeago } from '../../Atoms/Timeago';
import { DialogExport } from '../DialogExport';

interface MainProps {
  children: React.ReactNode
  isNaviOpen: boolean
  showNavi: () => void
  title: string,
  noteId: string,
  updateAt: string | null,
  closeModal: () => void
}

export const Main: React.FC<MainProps> = ({
  updateAt,
  showNavi,
  title,
  children,
  isNaviOpen,
  noteId,
  closeModal
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [exportDialog, setExportDialog] = useState(false)

  function toggleMenu() {
    setIsOpen(!isOpen)
  }

  function closeDropdownMenu() {
    let timeOut: NodeJS.Timeout | null = null
    timeOut = setTimeout(() => {
      setIsOpen(false)
      if (isOpen === false) {
        timeOut && clearTimeout(timeOut)
      } else {
        setIsOpen(false)
      }
    }, 300)
  }

  function showExportDialog(ev: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    console.log('exportDialog', exportDialog)
    ev.stopPropagation()
    ev.preventDefault()
    setExportDialog(!exportDialog)
  }

  return (
    <>
      <main className={style.main} data-navigation-visibility={isNaviOpen}>
        <header className={style.header}>
          <button data-navigation-is-open={isNaviOpen} onClick={showNavi} className={style['btn-toggle-navigation']}>
            <LuChevronsRight />
          </button>
          <h3 className={style.title}>
            {title}
          </h3>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger toggleMenu={toggleMenu}>
              <LuMoreHorizontal shapeRendering="geometricPrecision" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal open={isOpen} onBlur={closeDropdownMenu}>
              <DropdownMenu.Item>
                <DropdownMenu.Icon >
                  <TbSquareRoundedPlus shapeRendering="geometricPrecision" />
                </DropdownMenu.Icon>
                Create Note
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <DropdownMenu.Icon><TbFileX shapeRendering="geometricPrecision" /></DropdownMenu.Icon>
                Delete
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={showExportDialog}>
                <DropdownMenu.Icon><TbDownload shapeRendering="geometricPrecision" /></DropdownMenu.Icon>
                Export
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={closeModal}>
                Sair
              </DropdownMenu.Item>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </header>
        <section className={style.content}>
          {children}
        </section>
        <footer className={style.footer}>
          {updateAt !== null && <Timeago time={updateAt} />}
        </footer>
      </main >
      {exportDialog && <DialogExport
        id={noteId}
        open={exportDialog}
        closeDialog={() => setExportDialog(false)}
      />}
    </>
  )
}
