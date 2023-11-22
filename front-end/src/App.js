import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import Teste from './pages/teste/teste';
import Otro from './pages/otro/otro';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Teste />} />
      <Route path='/outro' element={<Otro />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
