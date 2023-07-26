import Select from 'react-select';
import { Dialog } from '../../Molecules/Dialog';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { extensions } from '../../../core/Editor/extensions';
import { generateHTML } from '@tiptap/react';
import { notes } from '../../../database/notes';

interface Props {
  id: string,
  open: boolean,
  closeDialog: () => void
}

const DialogExport: React.FC<Props> = ({ id, open, closeDialog }) => {
  const [isOpen, setIsOpen] = useState(open)
  const [exportType, setExportType] = useState('html')
  const [currentContent, setCurrentContent] = useState<null | string>(null)
  const [title, setTitle] = useState('Unitled')

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  useEffect(() => {
    async function setContent() {
      const response = await notes.get({ id })

      response && setCurrentContent(generateHTML(response.content, extensions))
      response && setTitle(response.title)
    }

    setContent().catch(console.error)
  }, [id, title])


  const options = [
    { value: 'html', label: 'HTML' },
    { value: 'markdown', label: 'Markdown' },
  ]

  const handleExport = () => {
    if (exportType === 'html' && currentContent) {

      const htmlBlog = new Blob([currentContent], { type: "text/html" });

      // Crie um URL temporário para o Blob
      const pdfUrl = URL.createObjectURL(htmlBlog);

      // Crie um link de download
      const downloadLink = document.createElement("a");
      downloadLink.href = pdfUrl;
      downloadLink.download = `${title}.html`; // Defina o nome do arquivo de download
      downloadLink.click();

      URL.revokeObjectURL(pdfUrl);
    }
  }


  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Box>
        <div className={style.form}>
          <fieldset>
            <label htmlFor="">Export</label>
            <Select onChange={ev => setExportType(ev?.value as string)} defaultValue={{ value: 'html', label: 'HTML' }} options={options} isSearchable={false} styles={{
              container: () => ({
                width: 'auto',
                position: 'relative'
              }),
              indicatorsContainer: () => ({
                backgroundColor: 'transparent',
              }),
              indicatorSeparator: () => ({
                backgroundColor: '#666'
              }),
              control: () => ({
                backgroundColor: 'transparent',
                width: 'auto',
                display: 'flex',
              }),
              singleValue: (base) => ({
                ...base,
                color: "#fff"
              }),
              valueContainer: (base) => ({
                ...base,
                color: '#fff',
                cursor: 'pointer'
              }),
              menu: () => ({
                backgroundColor: '#242424',
                widht: '200px',
                position: 'absolute',
                right: '0px',
                padding: "8px 4px",
                borderRadius: "3px",
                boxShadow: '-4px 4px 9px 0px rgba(0,0,0,0.25),'
              }),
              option: (base, state) => ({
                ...base,
                width: '200px',
                cursor: "pointer",
                background: state.isFocused ? '#323232' : '#242424'
              })
            }} />
          </fieldset>
          <div className={style.footer}>
            <button onClick={closeDialog} className={style.btn}>Cancel</button>
            <button onClick={handleExport} className={[style.btn, style.action].join(" ")}>Export</button>
          </div>
        </div>
      </Dialog.Box>
    </Dialog.Root>
  )
}

export { DialogExport }
