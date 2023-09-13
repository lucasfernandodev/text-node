import style from './style.module.css'
import Editor from '@core/Editor'
import { Main } from '../../Organisms/Main';
import { Navigation } from '../../Organisms/Navigation';
import { useCallback, useEffect, useState } from 'react';

import { Modal } from '../../Atoms/Modal';
import { merge } from '@utils/merge';
import { dragModal } from '@utils/dragModal';

interface OverlayEditorTemplateProps {
  noteId: string,
  removeModal: () => void
}

const OverlayEditorTemplate: React.FC<OverlayEditorTemplateProps> = ({ removeModal, noteId }) => {

  const [title, setTitle] = useState('Unitled');
  const [openNavigation, setOpenNavigation] = useState(false);
  const [currentNoteId, setCurrentNodeId] = useState(noteId)
  const [updateAt, setUpdateAt] = useState<string | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    setCurrentNodeId(noteId)
  }, [noteId])

  function toggleNavigation() {
    setOpenNavigation(!openNavigation)
  }

  function changeExpandedOption(){
    setIsExpanded(!isExpanded)
  }

  const _dragModal = useCallback((ref: HTMLElement) => {
    dragModal(ref)
    if(isExpanded){
      const modal = document.querySelector('.modal-wrapper') as HTMLDivElement;
      if(modal){
        modal.style.top = '0px'
      }
    }
  }, [isExpanded])

  return (
    <Modal 
      className={merge([style.modal, "modal-wrapper"])}
      data-nav-open={openNavigation}
      data-expanded={isExpanded}
      ref={_dragModal}
    >
      <Navigation changeNote={setCurrentNodeId} open={openNavigation} close={toggleNavigation} />
      <Main
        isExpanded={isExpanded}
        showNavi={toggleNavigation}
        isNaviOpen={openNavigation}
        title={title}
        updateAt={updateAt}
        closeModal={removeModal}
        changeExpandedOption={changeExpandedOption}
      >
        <Editor noteId={currentNoteId} changeTitle={setTitle} changeUpdateAt={setUpdateAt} />
      </Main>
    </Modal>
  )
}

export default OverlayEditorTemplate
