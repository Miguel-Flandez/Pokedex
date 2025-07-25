import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Main, Details } from './pages'
import './App.css'

function App() {

  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/details' element={<Details/>}/>
      </Routes>
    </BrowserRouter>

  )
  
}

export default App
