import logo from './logo.svg';
import './App.css';
import {useState, createContext, useReducer} from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/home';
import ProgramsPage from './pages/programs';
import CoursesPage from './pages/courses';
import ReviewPage from './pages/review';

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
  const [globalSelectedProgram, programDispatch] = useReducer(selectedProgramReducer, new Set()); // Must be reducer for minor/ major logic
  const [globalFaculty, setFaculty] = useState(null);
  const [globalSelectedCourses, coursesDispatch] = useReducer(selectedCoursesReducer, new Set());

  // Main app navigation
  return (
    <AppContext.Provider value = {[globalSelectedProgram, programDispatch, globalFaculty, setFaculty, globalSelectedCourses, coursesDispatch]}>
      <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/programs" element={<ProgramsPage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/review" element={<ReviewPage />} />
      </Routes>
    </div>
    </AppContext.Provider>
    );
  }

export default App;
