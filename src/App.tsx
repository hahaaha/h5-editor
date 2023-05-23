import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { fabric } from "fabric"
import './App.css'
import { FabricCanvas } from './components/fabricCanvas'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <FabricCanvas />
      </div>
    </>
  )
}

export default App
