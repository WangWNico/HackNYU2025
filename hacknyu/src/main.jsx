import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import DungeonMaster from './DungeonMaster.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DungeonMaster.jsx />
  </StrictMode>,
)
