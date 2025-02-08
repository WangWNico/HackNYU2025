import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import UserInterface from './ui/UserInterface.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <UserInterface />
      </div>
    </>
  )
}

export default App
