import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import About from './Pages/About'




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/about' element={<About />} />

      </Routes>
    </BrowserRouter>

  )
}

export default App