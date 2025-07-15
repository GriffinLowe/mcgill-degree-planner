import logo from './logo.svg';
import './App.css';
import NavBar from 'components/NavBar'
import Footer from 'components/Footer'

function App() {

  const [faculty, setFaculty] = useState('science');
  
  
  function handleSelect(faculty) {
    setFaculty(faculty);
  }

  return (
    <Router>
      <NavBar></NavBar>
      <Routes>
        <Route></Route>
        <Route></Route>
        <Route></Route>
        <Route></Route>
        <Route></Route>
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
