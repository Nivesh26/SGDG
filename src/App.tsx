import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Project from './Pages/Project'
import Services from './Pages/Services'




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/project' element={<Project />} />
        <Route path='/services' element={<Services />} />


        <Route path='/signup' element={<Signup />} />

      </Routes>
    </BrowserRouter>

  )
}

export default App