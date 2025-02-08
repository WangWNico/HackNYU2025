import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DungeonMasterTest from './DungeonMasterTest.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <DungeonMasterTest />
    </>
  </StrictMode>,
)
