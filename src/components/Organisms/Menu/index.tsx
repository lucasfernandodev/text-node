import { LuMoreHorizontal } from 'react-icons/lu';
import { TbDownload, TbFileX, TbSquareRoundedPlus } from 'react-icons/tb'
import { DropdownMenu } from '../../Molecules/DropdownMenu';
import { useState } from 'react';
import { useNote } from '@context/Notes/useNote';
import { nanoid } from 'nanoid';
import { useDialog } from '@context/Dialog/useDialog';

export const Menu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { changeNoteId } = useNote()
  const { setDialog } = useDialog()

  function closeDropdownMenu() {
    let timeOut: NodeJS.Timeout | undefined = undefined
    timeOut = setTimeout(() => {
      setIsOpen(false)
      if (isOpen === false) {
        timeOut && clearTimeout(timeOut as unknown as number)
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

  const menuCommands = {
    createNote: () => {
      changeNoteId(nanoid())
    },
    exportNote: () => {
      setDialog('export')
    },
    deleteNote: () => {
      setDialog('delete')
    },
    closeNote: () => {
      setDialog('close')
    }
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger toggleMenu={toggleMenu}>
        <LuMoreHorizontal />
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal open={isOpen} onBlur={toggleMenu}>
        <DropdownMenu.Item command={menuCommands.createNote}>
          <DropdownMenu.Icon><TbSquareRoundedPlus /></DropdownMenu.Icon>
          Create Note
        </DropdownMenu.Item>
        <DropdownMenu.Item command={menuCommands.deleteNote}>
          <DropdownMenu.Icon><TbFileX /></DropdownMenu.Icon>
          Delete
        </DropdownMenu.Item>
        <DropdownMenu.Item command={menuCommands.exportNote}>
          <DropdownMenu.Icon><TbDownload /></DropdownMenu.Icon>
          Export
        </DropdownMenu.Item>
        <DropdownMenu.Divider />
        <DropdownMenu.Item command={menuCommands.closeNote}>
          Close
        </DropdownMenu.Item>
      </DropdownMenu.Portal>
    </DropdownMenu.Root >
  )
}
