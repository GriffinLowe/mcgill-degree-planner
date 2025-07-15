import logo from './logo.svg';
import './App.css';
import {useState, createContext, useReducer} from 'react';
import {Routes, Route} from 'react-router-dom';
import NavBar from './/components/NavBar';
import HomePage from '//pages/home'
import ProgramsPage from '//pages/programs'

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
          programState.remove(programObject);
          console.log("INFO: selectedProgramReducer: " + String(programObject) + " successfully deleted from globalSelectedProgram")          
          return new Set([...programState])
        default:
          console.log("ERROR: Program Reducer: Invalid action type specified");
          return globalSelectedProgram;
      }
  };

  // Reducer for globalSelectedCourses state
  const selectedCoursesReducer = (selectedCoursesState, selectedCourseObject, action) => {
    switch(action) {
        case 'write':
          selectedCoursesState.add(selectedCourseObject);
          console.log('INFO: selectedCoursesReducer:' + String(selectedCoursesObject) + ' succesfully written to globalSelectedCourses');
          break;
        case 'delete':
          selectedCoursesState.remove(selectCourseObject);
          console.log("INFO: selectedCoursesReducer: " + String(selectedCoursesObject) + ' succesfully deleted from globalSelectedCourses');
          break;
        default:
          console.log("ERROR: selectedCoursesReducer: action specified not recognized");
    }
  };


  // Defining global states:
  const [globalSelectedProgram, programDispatch] = useReducer(selectedProgramReducer, new Set()); // Must be reducer for minor/ major logic
  const [globalFaculty, setFaculty] = useState(null);
  const [globalSelectedCourses, coursesDispatch] = useReducer(selectedCoursesReducer, new Set());

  // Main app navigation
  return (
    <AppContext.Provider value = {[globalSelectedProgram, programDispatch, globalFaculty, setFaculty, globalSelectedCourses, coursesDispatch]}>
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
