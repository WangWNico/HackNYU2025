import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DungeonMasterTest from './DungeonMasterTest.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <div style={{ color: 'white' }}>Debug: App Component</div>
      <App />
      <div style={{ color: 'white' }}>Debug: DungeonMasterTest Component</div>
      <DungeonMasterTest />
    </>
  </StrictMode>
)
