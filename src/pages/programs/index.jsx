//// import React from 'react'
import './index.scss'

export default Programs = (handleSelectFaculty, handelSelectProgram) => {
    
    // Reducers:
    function ProgramReducer(programState, action, programObject) {
        switch(action) {
            case 'write':
                programState.add(programObject)
                break;
            case 'delete':
                if (programState.remove(program)) {
                    
                }
                break;
            default:
                console.log("Invalid action was specified")
        }
    }


    useEffect(() => {
        // Get programs
        fetch("*** NEED TO FIND API KEYS***")
        .then((data) => (data.json()))
        .then((data) => (setPrograms(data)))
        .catch(console.log(error));
        
        // Define faculties:
        const faculties = [
            { key: 'science', value: 'science', display: 'Science' },
            { key: 'arts', value: 'arts', display: 'Arts' },
            { key: 'art-sci', value: 'art-sci', display: 'Arts & Sciences' },
            { key: 'environment', value: 'environment', display: 'Environment' },
            { key: 'engineering', value: 'engineering', display: 'Engineering' },
            { key: 'management', value: 'management', display: 'Management' },
            { key: 'music', value: 'music', display: 'Music' }
        ];

        setFaculties(faculties)},
        []);

    return (
        <div className='programs-container'>      
            <div className='faculty-dropdown-wrapper'>
                <label htmlFor='faculty-select'>Select your faculty</label>
                <select
                className='dropdown'
                name='faculty-select'
                onChange={(e) => setFaculty(e.target.value)}
                value={faculty}
                >
                <option value=''>-- Select Faculty --</option>
                {faculties.map((item) => (
                    <option key={item.key} value={item.value}>
                    {item.display}
                    </option>
                ))}
                </select>
            </div>
        </div>
        );
}