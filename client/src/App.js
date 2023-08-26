import{Routes,Route} from 'react-router-dom'
import Homepage from './pages/HomePage';
import About from './pages/About.js';
import Contact from './pages/Contact.js';
import Policy from './pages/Policy';
import Pagenotfound from './pages/Pagenotfound';
import Register from './pages/Auth/Register';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
  <>
      <Routes>
        <Route path='/' element={<Homepage/>}  />
        <Route path='/register' element={<Register/>}  />
        <Route path='/about' element={<About/>}  />
        <Route path='/contact' element={<Contact/>}  />
        <Route path='/policy' element={<Policy/>}  />
        <Route path='*' element={<Pagenotfound/>}  />

      </Routes>
  </>       
  );
}

export default App;
