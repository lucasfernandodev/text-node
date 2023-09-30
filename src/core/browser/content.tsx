import React from 'react'
import ReactDOM from 'react-dom/client'
import '@styles/colors.css';
import '@styles/global.css';
import '@styles/editor.css';
import '@styles/highlight.css';
import '@styles/customExtensions/image.css';
import { OverlayEditor } from '@pages/OverlayEditor';

const root = document.createElement('div')
root.id = 'tn-root'
document.body.append(root)
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <OverlayEditor />
  </React.StrictMode>,
)
