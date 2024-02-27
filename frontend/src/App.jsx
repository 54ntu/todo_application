import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Application from './components/Application'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>   
    <Navbar/>

    <Application/>    
    </>
  )
}

export default App
