import React from 'react'
import ReactDOM from 'react-dom/client'
import '../../style/colors.css';
import '../../style/global.css';
import '../../style/editor.css';
import '../../style/highlight.css';
import { OverlayEditor } from '../../pages/OverlayEditor';

const root = document.createElement('div')
root.id = 'tn-root'
document.body.append(root)
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <OverlayEditor />
  </React.StrictMode>,
)
