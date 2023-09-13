import React from 'react'
import ReactDOM from 'react-dom/client'
import { Popup } from '@pages/Popup'
import '@styles/colors.css';
import '@styles/popup/style.css';

const root = document.getElementById('root_popup') as Element

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>,
)
