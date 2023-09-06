import Select from 'react-select';
import { Dialog } from '../../Molecules/Dialog';
import style from './style.module.css';
import { useEffect, useState } from 'react';
import { extensions } from '../../../core/Editor/extensions';
import { generateHTML } from '@tiptap/react';
import { notes } from '../../../database/notes';
import { Button } from '../../Atoms/Button';
import { useDialog } from '../../../context/Dialog/useDialog';
import { useNote } from '../../../context/Notes/useNote';
import { styles } from './select-style';
import { merge } from '../../../utils/merge';


const DialogExport = () => {

  const [exportType, setExportType] = useState('html')
  const [currentContent, setCurrentContent] = useState<null | string>(null)
  const [title, setTitle] = useState('Unitled')
  const { id } = useNote()
  const { setDialog } = useDialog()

  useEffect(() => {
    async function setContent() {
      if (id) {
        const response = await notes.get({ id })

        response && setCurrentContent(generateHTML(response.content, extensions))
        response && setTitle(response.title)
      }
    }

    setContent().catch(console.error)
  }, [id])


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
    <Dialog.Root open={true}>
      <Dialog.Box>
        <div className={style.form}>
          <fieldset>
            <label htmlFor="">Export</label>
            <Select
              onChange={ev => setExportType(ev?.value as string)}
              defaultValue={{ value: 'html', label: 'HTML' }}
              options={options}
              isSearchable={false}
              styles={{ ...styles }} />
          </fieldset>
          <div className={style.footer}>
            <Button onClick={() => setDialog('')} className={style.btn}>Cancel</Button>
            <Button onClick={handleExport} className={merge([style.btn, style.btnExport])}>Export</Button>
          </div>
        </div>
      </Dialog.Box>
    </Dialog.Root>
  )
}

export { DialogExport }
