import { LuMoreHorizontal } from 'react-icons/lu';
import { TbDownload, TbFileX, TbSquareRoundedPlus } from 'react-icons/tb'
import { DropdownMenu } from '../../Molecules/DropdownMenu';
import { useState } from 'react';
import { useDialog } from '../../../context/Dialog/useDialog';


export const Menu = () => {
  const { setDialog } = useDialog()
  const [isOpen, setIsOpen] = useState(false)

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

  function toggleMenu() {
    if (!isOpen) {
      setIsOpen(true)
    } else {
      closeDropdownMenu()
    }
  }

  function openExport() {
    setDialog('export')
  }

  return (
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
        <DropdownMenu.Item onClick={openExport}>
          <DropdownMenu.Icon><TbDownload shapeRendering="geometricPrecision" /></DropdownMenu.Icon>
          Export
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          Sair
        </DropdownMenu.Item>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
