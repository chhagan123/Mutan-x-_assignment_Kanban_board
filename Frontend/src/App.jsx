import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "./index.css"
import React from 'react'
import Board from './components/Board'
import Toolbar from './components/ToolBar'
function App() {

    const [showModal,setShowModal] = useState(false)
  return (
    <>
    <div className=' w-screen h-screen flex flex-col items-center justify-center'>
      <h1 className='text-shadow-black text-3xl'>Welcome To Kanban Board</h1>
    <Toolbar showModal={showModal} setShowModal={setShowModal}/>
    <Board showModal={showModal} setShowModal={setShowModal}/>
    </div>
   
    </>
  )
}

export default App
