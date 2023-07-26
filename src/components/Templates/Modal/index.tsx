import style from './style.module.css'
import Editor from '../../../core/Editor'
import { Main } from '../../Organisms/Main';
import { Navigation } from '../../Organisms/Navigation';
import { useEffect, useState } from 'react';

import { Modal } from '../../Atoms/Modal';

interface HomepageTemplateProps {
  noteId: string,
  closeModal: () => void
}

const HomepageTemplate: React.FC<HomepageTemplateProps> = ({ closeModal, noteId }) => {

  const [title, setTitle] = useState('Unitled');
  const [openNavigation, setOpenNavigation] = useState(false);
  const [currentNoteId, setCurrentNodeId] = useState(noteId)
  const [updateAt, setUpdateAt] = useState<string | null>(null)

  useEffect(() => {
    setCurrentNodeId(noteId)
  }, [noteId])

  function toggleNavigation() {
    setOpenNavigation(!openNavigation)
  }

  return (
    <Modal className={style.modal}>
      <Navigation changeNote={setCurrentNodeId} open={openNavigation} close={toggleNavigation} />
      <Main
        noteId={currentNoteId}
        showNavi={toggleNavigation}
        isNaviOpen={openNavigation}
        title={title}
        updateAt={updateAt}
        closeModal={closeModal}
      >
        <Editor noteId={currentNoteId} changeTitle={setTitle} changeUpdateAt={setUpdateAt} />
      </Main>
    </Modal>
  )
}

export default HomepageTemplate
