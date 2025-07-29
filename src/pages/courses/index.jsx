import {useReducer, useState, useMemo} from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';
import { SemesterBox } from'./components/Semester';

// SEM ID FORMATTED AS {YEAR: NUMBER}
// SEMS CONTAINED IN LINKED LIST, EACH NODE IS FORMATTED {'next': key, 'prev': key, 'courses': array}

export default Courses = () => {

    // Helper function: acts as a semester object constructor: nodes of linked list
    const Semester = (year, period) => {
        return {
            'semID': String(year) + String(period),
            'title': keyToTitle(year, period),
            'year': year, 
            'period': period,
            'next': null,
            'prev': null,
            'courses': Array()
        }
    }

    // Page states:
    const [rootSem, setRootSem ] = useState(Semester());

    // Helper function: increment semID forward
    const incrementSemPeriod = (period, year) => { 

        let newPeriod = period;
        let newYear = year;

        if(currentId.period == 3) {
            newPeriod = 1;
            newYear += 1;
        }
        else
            newPeriod += 1;

        return { newPeriod, newYear } 
        }

    // Helper function: year + period to title:
    const keyToTitle = (year, period) => {

        let semName = '';

        // Map period to season
        switch (period) {
            case 1:
                semName = 'Winter';
                break;
            case 2:
                semName = 'Summer';
                break;
            case 3:
                semName = 'Fall';
                break;
            default:
                console.error("ERROR: Invalid period specified in converting period to title")
        }

        // Concatenate and return:
        return semName + String(year)
    }
    
    // Helper function: get current sem ID based on time (the actual current sem):
    const getActualSem = () => {
        
        // Gathering actual date:
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();

        // Translating month/ year into semeter/year  (winter, summer, fall)
        if(month <= 3)
            return {'period': 2, 'year': year} // Summer sem
        else if (month <= 8)
            return {'period': 3, 'year': year} // Fall sem
        else
            return {'period': 1, 'year': year + 1} // Winter sem
    }

    // Helper function: get the second sem being displayed  (used to avoid writing sem.next)
    const getSecondSem = () => {
        return rootSem.next;
    }

    // Helper function: get the third sem being displayed (used to avoid writing sem.next.next)
    const getThirdSem = () => {
        return rootSem.next.next;
    }
    
    // Helper function: handles backward navigation logic
    const handleBackward  = () => {

        console.log('INFO: Attempting backward sem navigation');

        // If there is no prev sem, then we are at the earliest sem possible
        if(rootSem.prev === null)
            console.log('INFO: unable to increment backwards');
        else {
            console.log("INFO: incremented root sem backwards");
            setRootSem(rootSem.prev);
        }
    }

    // Helper function: handles forward navigation logic:
    const handleForward = () => {
        
        // Retreive third sem object:
        thirdSem = getThirdSem();

        // Edge case: next sem not defined:
        if(thirdSem.next === null) {
            const { newPeriod, newYear } = incrementSemPeriod(thirdSem.year, thirdSem.period);
            const newSem = Semester(newYear, newPeriod);
            thirdSem.next = newSem;
            newSem.prev = thirdSem;

            console.log("INFO: created new future-most semester")
        }

        // Actual incremendation:
        setRootSem(rootSem.next);

        console.log("INFO: root semester incremented forward")
    }

    // Mount logic: create semester objects:
    useEffect = (() => {

        // Obtain sem dates:
        const { firstPeriod, firstYear } = getActualSem();
        const { secondPeriod, secondYear } = incrementSemPeriod(firstPeriod, firstYear);
        const { thirdPeriod, thirdYear } = incrementSemPeriod(secondPeriod, secondYear); 

        // Initialize sem objects:
        const firstSem = Semester(firstYear, firstPeriod);
        const secondSem= Semester(secondYear, secondPeriod);
        const thirdSem = Semester(thirdYear, thirdPeriod);

        // Implement linked list pointers:
        firstSem.next = secondSem;
        secondSem.next = thirdSem;
        secondSem.prev = firstSem; 
        thirdSem.prev = secondSem;
    }, [])

    return (
        <DndProvider backend={HTML5Backend}>
            <div className='sem-navigator-wrapper'>
                <button 
                    className='forward-btn' 
                    img='*** INSERT FORWARD IMAGE ***'
                    onClick={() => handleForward()}
                >
                Forward
                </button>
                <button 
                    className='backward-btn' 
                    img='*** INSERT BACKWARD IMAGE ***'
                    onClick={() => handleBackward()}
                >
                Back
                </button>
            </div>
            <div className='sem-display-wrapper'>
                <firstSem></firstSem>
                <secondSem></secondSem>
                <thirdSem></thirdSem>
            </div>
            <div className='course-search-wrapper'>
                <input className='course-search-bar' placeholder='search for a course'></input>
            </div>
        </DndProvider>
    )
}