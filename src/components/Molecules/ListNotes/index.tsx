import { LuFileText } from 'react-icons/lu';
import style from './style.module.css';
import { INote } from '../../../types/note';

interface ListNotesProps {
  notes: INote[],
  changeNote: (noteId: string) => void
}

export const ListNotes = ({ notes, changeNote }: ListNotesProps) => {
  return (
    <ul className={style.list}>
      {notes.map(note => (
        <li className={style.item} key={note.id}>
          <a href="#" className={style['item-action']} onClick={() => changeNote(note.id)}>
            <LuFileText />
            <span> {note.title}</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
