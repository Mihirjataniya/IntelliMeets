import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Meeting from './pages/Meeting'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/meeting' element={<Meeting />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
