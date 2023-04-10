
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Navbar from './components/Navbar'


function App() {
  return (
    <>
    <Navbar/>
      <h1>This is H1</h1>
    </>
  );
}

export default App;
