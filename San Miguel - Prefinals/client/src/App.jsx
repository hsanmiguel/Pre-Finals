import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route }  from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'


import Index from './Index.jsx'
import About from './About.jsx'
import Create from './Create.jsx'
import Update from './Update.jsx'
import Delete from './Delete.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Index />}></Route>
          <Route path = '/about' element = {<About />}></Route>
          <Route path = '/create' element = {<Create />}></Route>
          <Route path = '/update/:id' element = {<Update />}></Route>
          <Route path = '/delete/:id' element = {<Delete />}></Route>        
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
