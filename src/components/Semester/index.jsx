import { useDrop } from 'react-dnd';
import { useRef, useEffect, useState } from 'react';

// NEED TO ADD SAFEGUARDS: IE CANNOT DROP AND ADD IF EXCEEDING MAC CREDITS
export function SemesterBox({ semObject }) {

    // States
    const [semCredits, setSemCredits] = useRef(0);
    const [courseList, setCourseList] = useState(semObject.courses)
    
    // Drag and drop functionality
    const [, dropRef] = useDrop(() => ({
    accept: 'COURSE',
    drop: (item) => {
        if(item.credits + semCredits <= 17) {
            addCourse(item, semesterId);
            setSemCredits(semCredits + item.credits);
            console.log('INFO: ' + String(item.code) + ' added to dropdown menu')
        }
        else {
            
            console.log('INFO: unable to add course to dropdown menu. Semester credit limit exceeded.')
        }
    },
    }));
    
    // Helper function: handle select (meant to remove course item):
    const handleClick

    // Helper function

    // Mount and dismount logic:
    useEffect =(() => { 
        setCourseList(semObject.)
    }, [])

  return (
    <div
        className={drop-target-wrapper}
        ref={dropRef}
    >
        <ol className='course-display-list'>
            {courseList.map((item) => 
                <li 
                    className='course-display-entry' 
                    value={item.code}
                    onClick={}
                >

                </li>)}
        </ol>

    </div>
  );
}
