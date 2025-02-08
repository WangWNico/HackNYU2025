import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DungeonMaster from './DungeonMaster'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <DungeonMaster />
    </>
  </StrictMode>
)
