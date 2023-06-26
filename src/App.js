import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate } from 'react-router-dom'
import SearchForm from './SearchForm';
import Card from './Card';

function App() {
  return (
    <Router>
      <div style={{ "fontFamily": "Belanosima" }} className='h-screen flex justify-center items-center bg-slate-300'>
        <Routes>
          <Route path='/' element={<SearchForm />}></Route>
          <Route path='/city/:id' element={<Card />}></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;