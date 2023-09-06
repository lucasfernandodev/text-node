import style from './style.module.css';
import { Dialog } from '../../Molecules/Dialog';
import { Button } from '../../Atoms/Button';
import { useDialog } from '../../../context/Dialog/useDialog';
import { useNote } from '../../../context/Notes/useNote';
import { notes } from '../../../database/notes';
import { nanoid } from 'nanoid';
import { merge } from '../../../utils/merge';


const DialogDelete = () => {

  const { id } = useNote()
  const { setDialog } = useDialog()
  const { changeId } = useNote()

  function handleDelete() {
    async function execute() {
      id && await notes.delete({ id })
    }

    execute().catch(console.error)
    setDialog('')
    changeId(nanoid())
  }

  return (
    <Dialog.Root open={true}>
      <Dialog.Box>
        <div className={style.form}>
          <div className={style.content}><span>Are you sure?</span></div>
          <div className={style.footer}>
            <Button onClick={() => setDialog('')} className={style.btn}>Cancel</Button>
            <Button onClick={handleDelete} className={merge([style.btn, style.btnDelete])}>Deletar</Button>
          </div>
        </div>
      </Dialog.Box>
    </Dialog.Root>
  )
}

export { DialogDelete }
