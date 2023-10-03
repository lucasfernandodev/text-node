import React, { useEffect, useState } from 'react';
import { LuChevronUp } from 'react-icons/lu';
import { TbNote } from 'react-icons/tb'
import style from './style.module.css';
import { INote } from '../../../types/note';
import { Details } from '../Details';
import { useNote } from '@context/Notes/useNote';
import { CommunicationProps, communication } from '@utils/browser/communication';
import { query } from '@database/notes';

interface ListNotesProps {
  notes: INote[],
  changeNote: (noteId: string) => void
}

interface ListProps {
  title: string,
  notes: INote[],
  openNote: (noteId: string) => void
}

interface data {
  editor: { command: string }
}


const List: React.FC<ListProps> = ({ title,notes }) => {

  const [currentNotes, setCurrentNotes] = useState(notes)

  const { id, changeNoteId } = useNote()

  function openNote(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, noteId: string) {
    e.preventDefault()
    changeNoteId(noteId)
  }

  useEffect(() => {

    function listener({ data, source, subject }: CommunicationProps<data>) {
      if (source === 'service_worker' && subject === 'navigation:update') {
        if (data.editor.command === 'update') {
          const initialize = async () => {
            const data = await query.notes.getAll()
            data && setCurrentNotes(data)
          }
      
          initialize().catch(console.error)
        }
      }
    }

    communication.content.listen(listener)

    return () => {
      communication.content.listen(listener, true)
    }
  }, [])

  return (
    <Details.Root className={style.group} open={title === 'Local' && true}>
      <Details.Summary className={style.title}>
        {title}
        <span className={style.control}><LuChevronUp /></span>
      </Details.Summary>
      <Details.Content>
        {currentNotes.length === 0 && <p className={style.listEmpty}>You haven't written any notes yet.</p>}
        <ul>
          {currentNotes.map(note => (
            <li className={style.item} key={note.id} data-active={id === note.id}>
              <a href="#" className={style['item-action']} onClick={e => openNote(e, note.id)}>
                <i><TbNote /></i>
                <span>{note.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </Details.Content>
    </Details.Root>
  )
}

type TFilterNotes = (notesUnfiltred: INote[]) => [INote[], INote[]]

export const ListNotes = ({ notes, changeNote }: ListNotesProps) => {

  const filterNotes: TFilterNotes = (notesUnfiltred: INote[]) => {
    const arr: [INote[], INote[]] = [[], []]

    notesUnfiltred.map(n => {
      if (n.site === window.location.hostname) return arr[0].push(n)
      arr[1].push(n)
    })

    return arr
  }

  const [localNotes, globalNotes] = filterNotes(notes)

  return (
    <>
      <List title="Local" openNote={changeNote} notes={localNotes} />
      {globalNotes.length !== 0 && <List title="Global" openNote={changeNote} notes={globalNotes} />}
    </>
  )
}
