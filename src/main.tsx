import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './style/global.css'
import { Popup } from './pages/Popup'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StrictMode>
      <Popup />
    </StrictMode>
  </React.StrictMode>,
)
