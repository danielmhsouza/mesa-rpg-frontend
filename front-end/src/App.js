import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import Teste from './pages/teste/teste';
import Home from './pages/home/home';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/teste' element={<Teste />} />
      <Route path='/' element={<Navigate to='/home'></Navigate>} />
      <Route path='/home' element={<Home />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
