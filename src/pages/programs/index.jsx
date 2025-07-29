import { useContext, useEffect, useMemo} from 'react';
import './index.scss';
import {Modal} from 'react-modal';
import {useNavigate} from 'react-router-dom';

export default Programs = () => {
    
    // Retrieve global context
    const globalContext = useContext(AppContext);

    // Creating local states:
    const [selectedProgram, setSelectedProgram] = useState(globalContext.globalSelectedProgram);
    const [programCredits, setProgramCredits] = useState(0); // NEED TO RETRIEVE THIS VALUE FROM CONTEXT VARIABLE
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Staging variables used for selected programs:
    let stagingProgramJSON = null; // THIS WILL STORE JSON OBJECTS
    let stagingProgramTitle = null;
    let stagingProgramDescription = null;

    // Handles selection of a program in modal:
    function handleSelect(e) {
        console.log("INFO: Program Selected");
        stagingProgramJSON = e.targeted.value; // NEED TO MAKE THIS POINT TO A JSON OBJECT
        programDescription = ''; // *** NEED TO FIGURE OUT HOW TO ACCESS PROGRAM DESCRIPTION
    };

    // Handles submit button in modal:
    function handleSubmit() {

        // Set local states:
        try {
            setSelectedProgram(new Set(stagingProgramJSON, ...selectedProgram));
            setProgramCredits(programCredits + stagingProgramJSON.credts);
            setModalIsOpen(false);
            console.log('INFO: Local program states updated');
        }
        catch {
            console.error('ERROR: Local program states failed to update', error);
        }

        // Close the modal:
        setModalIsOpen(false);

        // Reseting staging variables:
        stagingProgramJSON = null;
        stagingProgramTitle = null;
        stagingProgramDescription = null;
    }

    // Handles save and exit function:
    function handleExit() {

        // Save selections to global variables: 
        globalContext.setGlobalSelectedProgram(selectedProgram);

        // Navigate to next page:
        const navigate = useNavigate();
        navigate("*** PATH TO COURSE PAGE ***");
    }

    // Mount logic:
    useEffect(() => {
        
        // NEED TO HANDLE MAJOR/ MI
        // Check if API information has already been cached:
        if(modalList == null) {

            console.log("INFO: initiating API call")

            //// NOTE TO SELF: YOU WILL LIKELY AVE TO ADJUST THE JSON PARSING LOGIC TO MAKE IT LIST ITEMS
            fetch('*** INSERT API KEY ***')
            .then((response) => response.json()) // Properly parse JSON
            .then((data) => {
                globalContext.setGlobalPrograms(data);
                console.log("INFO: API call successful");
            })
            .catch((error) => {
                console.error("ERROR: API call failed", error); // Log error with details
            });
        }
        else 
            console.log("INFO: Program data already cached. Accessed context cache.")     

        // Save global program listing to modal list state:
        setModalProgramList(globalContext.globalPrograms);
    }, []);
    
      return (
    <>
      <div className='program-composition-wrapper'>
        <progress className='programComposition-bar' value={programCredits} max={120}>
          Program Composition
        </progress>
        <button className='add-major-btn' onClick={() => {setModalIsOpen(true);}}>Add Major</button>
        <button className='add-minor-btn' onClick={() => {setModalIsOpen(true);}}>Add Minor</button>
      </div>

      <div className='modal-wrapper'>
        <Modal
          isOpen={modalIsOpen}
          contentLabel={`Select Your Program`}
          ariaHideApp={false} // Optional: if you're not rendering inside #root
        >
          <label htmlFor="program-select">Select your {modalType}:</label>
          <select
            id="program-select"
            className='program-drop-down'
            value={selectedProgramName}
            onChange={handleSelect}
          >
            {modalList.map((item) => (
              <option key={item.programName} value={item.programName}>
                {item.displayTitle}
              </option>
            ))}
          </select>

          {stagingProgramJSON && (
            <div className="staging-submission-box">
              <div className='program-text-wrapper'>
                <h2>{stagingProgramTitle}</h2>
                <p>{stagingProgramDescription}</p>
              </div>
              <button className='submit-program-btn' onClick={handleSubmit}>Submit</button>
            </div>
          )}
        </Modal>
      </div>

      <button className='save-program-configuration-btn' onClick={handleExit}>Save and Continue</button>
    </>
  );
}