import React from 'react'
import './index.css'

const HomePage = () => {
    return (
        <>
            <div className = 'container-home-page'>
                <div className = 'text-wrapper'>
                    <h1 style=''>Welcome to McGill Degree Planner</h1>
                    <h2>Worried you aren't selecting the right courses to graduate on time?</h2>
                    <h2>Just select your program, design your schedule, and we will check for you!</h2>
                </div>
                <link to='\programs'></link>
            </div>
        </>
    )
};

export default HomePage;


