import { BrowserRouter } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import { useSelector } from "react-redux";
import Routes from './Routes';

function App() {
  const {isLogged} = useSelector(st => st.isLogged)

  return (
    <>
      <BrowserRouter>
      <NavBar/>
      <Routes isLogged={isLogged}/>
      </BrowserRouter>
    </>
  );
}

export default App;
