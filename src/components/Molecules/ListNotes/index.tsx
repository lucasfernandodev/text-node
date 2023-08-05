import { LuChevronUp, LuFileText } from 'react-icons/lu';
import style from './style.module.css';
import { INote } from '../../../types/note';
import React from 'react';
import { Details } from '../Details';
import { useNote } from '../../../context/Notes/useNote';

interface ListNotesProps {
  notes: INote[],
  changeNote: (noteId: string) => void
}

interface ListProps {
  title: string,
  notes: INote[],
  openNote: (noteId: string) => void
}


const List: React.FC<ListProps> = ({ title, notes }) => {

  const { id, changeId } = useNote()

  function openNote(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, noteId: string) {
    e.preventDefault()
    changeId(noteId)
  }

  return (
    <Details.Root className={style.group} open={title === 'Local' && true}>
      <Details.Summary className={style.title}>
        {title}
        <span className={style.control}><LuChevronUp /></span>
      </Details.Summary>
      <Details.Content>
        <ul>
          {notes.map(note => (
            <li className={style.item} key={note.id} data-active={id === note.id}>
              <a href="#" className={style['item-action']} onClick={e => openNote(e, note.id)}>
                <i><LuFileText /></i>
                <span>{note.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </Details.Content>
    </Details.Root>
  )
}

export const ListNotes = ({ notes, changeNote }: ListNotesProps) => {

  const filterNotes = (notesUnfiltred: INote[]) => {
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
      <List title="Global" openNote={changeNote} notes={globalNotes} />
    </>
  )
}
