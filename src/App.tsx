import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Project from './Pages/Project'
import Services from './Pages/Services'
import Login from './Pages/Login'
import Todos from './Pages/Todos'



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/project' element={<Project />} />
        <Route path='/services' element={<Services />} />
        <Route path='/todos' element={<Todos />} />

        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

      </Routes>
    </BrowserRouter>

  )
}

export default App