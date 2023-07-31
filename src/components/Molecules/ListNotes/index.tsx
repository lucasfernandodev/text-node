import { LuChevronDown, LuChevronUp, LuFileText } from 'react-icons/lu';
import style from './style.module.css';
import { INote } from '../../../types/note';
import React, { useCallback } from 'react';
import { Details } from '../Details';

interface ListNotesProps {
  notes: INote[],
  changeNote: (noteId: string) => void
}

interface ListProps {
  title: string,
  notes: INote[],
  openNote: (noteId: string) => void
}


const List: React.FC<ListProps> = ({ title, notes, openNote }) => {

  const callback = useCallback(openNote, [openNote])

  return (
    <Details.Root className={style.group} open={title === 'Local' && true}>
      <Details.Summary className={style.title}>
        {title}
        <span className={style.control}><LuChevronUp /></span>
      </Details.Summary>
      <Details.Content>
        <ul>
          {notes.map(note => (
            <li className={style.item} key={note.id}>
              <a href="#" className={style['item-action']} onClick={() => callback(note.id)}>
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
