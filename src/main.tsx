import './style/global.css'
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Popup } from './pages/Popup'

const root = document.getElementById('root') as Element

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <StrictMode>
      <Popup />
    </StrictMode>
  </React.StrictMode>,
)
