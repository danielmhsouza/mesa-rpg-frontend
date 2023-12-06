import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import Teste from './pages/teste/teste';
import Home from './pages/home/home';
import Taverna from './pages/taverna/taverna';
import Cadastro from './pages/cadastro/cadastro';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/teste' element={<Teste />} />
      <Route path='/' element={<Navigate to='/home'></Navigate>} />
      <Route path='/home' element={<Home />} />
      <Route path='/taverna' element={<Taverna />} />
      <Route path='/cadastro' element={<Cadastro />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
