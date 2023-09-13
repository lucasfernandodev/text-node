import { LuChevronsLeft } from 'react-icons/lu';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { query } from '../../../database/notes';
import { ListNotes } from '../../Molecules/ListNotes';
import { INote } from '../../../types/note';
import { Button } from '../../Atoms/Button';

interface NavigationProps {
  open: boolean
  close: () => void
  changeNote: (noteId: string) => void
}


export const Navigation: React.FC<NavigationProps> = ({ changeNote, open, close }) => {

  const [listNotes, setListNotes] = useState<INote[]>([])


  useEffect(() => {
    const initialize = async () => {
      const data = await query.notes.getAll()
      data && setListNotes(data)
    }

    initialize().catch(console.error)

  }, [])

  return (
    <aside className={style.navigation} data-is-open={open}>
      <header className={style.header}>
        <h3 className={style.title}>Notes</h3>
        <Button onClick={close} className={style['btn-toggle-options']}>
          <LuChevronsLeft />
        </Button>
      </header>
      <section className={style.explorer}>
        {listNotes.length === 0 && (<p className={style.notFound}>You haven't created any notes yet.</p>)}
        {listNotes.length !== 0 && <ListNotes notes={listNotes} changeNote={changeNote} />}
      </section>
    </aside>
  )
}
