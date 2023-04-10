
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar'
import Home from './components/Home';
import About from './components/About';


function App() {
  return (
    <>

    <Navbar/>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route exact path='/about' element={<About/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
