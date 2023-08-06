import { LuMoreHorizontal } from 'react-icons/lu';
import { TbDownload, TbFileX, TbSquareRoundedPlus } from 'react-icons/tb'
import { DropdownMenu } from '../../Molecules/DropdownMenu';
import { useState } from 'react';
import { useNote } from '../../../context/Notes/useNote';
import { nanoid } from 'nanoid';

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { changeId } = useNote()

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

  function CreateNote() {
    changeId(nanoid())
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger toggleMenu={toggleMenu}>
        <LuMoreHorizontal />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal open={isOpen} onBlur={closeDropdownMenu}>
        <DropdownMenu.Item onClick={CreateNote}>
          <DropdownMenu.Icon><TbSquareRoundedPlus /></DropdownMenu.Icon>
          Create Note
        </DropdownMenu.Item>
        <DropdownMenu.Item dialog="delete">
          <DropdownMenu.Icon><TbFileX /></DropdownMenu.Icon>
          Delete
        </DropdownMenu.Item>
        <DropdownMenu.Item dialog='export'>
          <DropdownMenu.Icon><TbDownload /></DropdownMenu.Icon>
          Export
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          Sair
        </DropdownMenu.Item>
      </DropdownMenu.Portal>
    </DropdownMenu.Root >
  )
}
