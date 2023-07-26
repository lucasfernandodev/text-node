import React from 'react'
import ReactDOM from 'react-dom/client'
import '../../style/global.css';
import '../../style/editor.css';
import '../../style/highlight.css';
import { Homepage } from '../../pages/Homepage';

const root = document.createElement('div')
root.id = 'tn-root'
document.body.append(root)

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Homepage />
  </React.StrictMode>,
)
