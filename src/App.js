import logo from './logo.svg';
import './App.css';
import {useState, createContext, useReducer} from 'react';
import {Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/home'
import ProgramsPage from './pages/programs'

// Defining global context:
const AppContext = createContext();

function App() {

  // Reducer for globalSelectedProgram state
  const selectedProgramReducer = (programObject, action) => {
    switch(action) {
        case 'write':
          console.log("INFO: selectedProgramReducer: " + String(programObject) + " successfully written to globalSelectedProgram")
          return new Set([programObject, ...globalSelectedProgram]);
        case 'delete':
          globalSelectedProgram.remove(programObject);
          console.log("INFO: selectedProgramReducer: " + String(programObject) + " successfully deleted from globalSelectedProgram")          
          return new Set([...globalSelectedProgram])
        default:
          console.log("ERROR: Program Reducer: Invalid action type specified");
          return globalSelectedProgram;
      }
  };

  // Reducer for globalSelectedCourses state
  const selectedCoursesReducer = (selectedCourseObject, action) => {
    switch(action) {
        case 'write':
          console.log('INFO: selectedCoursesReducer:' + String(selectedCourseObject) + ' succesfully written to globalSelectedCourses');
          return new Set([selectedCourseObject, ...globalSelectedCourses])
        case 'delete':
          globalSelectedCourses.remove(selectedCourseObject);
          console.log("INFO: selectedCoursesReducer: " + String(selectedCourseObject) + ' succesfully deleted from globalSelectedCourses');
          return new Set([...globalSelectedCourses]);
        default:
          console.log("ERROR: selectedCoursesReducer: action specified not recognized");
    }
  };


  // Defining global states:
  const [globalSelectedProgram, setGlobalSelectedProgram] = useState(new Set()); // Must be reducer for minor/ major logic
  const [globalFaculty, setFaculty] = useState(null);
  const [globalSelectedCourses, setGlobalSelectedCourses] = useState(new Set());
  const [globalPrograms, setGlobalPrograms] = useState(null); 

  // Creating global context JSON:
  const globalVars = {
    'globalSelectedProgram': globalSelectedProgram,
    'programDispatch': setGlobalSelectedProgram,
    'globalFaculty': globalFaculty,
    'setFaculty': setFaculty,
    'globalSelectedCourses': globalSelectedCourses,
    'coursesDispatch': setGlobalSelectedCourses,
    'globalPrograms': globalPrograms,
    'setGlobalPrograms': setGlobalPrograms
  }

  // Main app navigation
  return (
    <AppContext.Provider value = {globalVars}>
      <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route exact path = '//github.com/GriffinLowe/mcgill-degree-planner/tree/master/src/pages/home' component={HomePage}></Route>
        <Route exact path = '//github.com/GriffinLowe/mcgill-degree-planner/tree/master/src/pages/programs' component={ProgramsPage}></Route>
      </Routes>
    </div>
    </AppContext.Provider>
    );
  }

export default App;
