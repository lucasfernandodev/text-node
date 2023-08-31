import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { Popup } from './pages/Popup'
import './style/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StrictMode>
      <Popup />
    </StrictMode>
  </React.StrictMode>,
)
