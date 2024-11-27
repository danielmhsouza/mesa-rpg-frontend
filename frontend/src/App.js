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
import Campanha from './pages/campanha/campanha';
import CriarCampanha from './pages/criarcampanha/CriarCampanha';
import EntrarCampanha from './pages/entrarcampanha/EntrarCampanha';
import CriarPersonagem from './pages/criarpersonagem/criarpersonagem';

function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/teste' element={<Teste />} />
      <Route path='/' element={<Navigate to='/home'></Navigate>} />
      <Route path='/home' element={<Home />} />
      <Route path='/taverna' element={<Taverna />} />
      <Route path='/cadastro' element={<Cadastro />} />
      <Route path='/campanha' element={<Campanha />} />
      <Route path='/entrarcampanha' element={<EntrarCampanha />} />
      <Route path='/criarcampanha' element={<CriarCampanha />} />
      <Route path='/criarpersonagem' element={<CriarPersonagem />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
