import React from 'react';
import { useNavigate } from 'react-router-dom'; 

export default ProgramDropDown = (props) => {

    return (
        // Add scroll down & item limits in CSS
        <div className='drop-down-wrapper'>
            <label for='drop-down'>{props.prompt}</label>
            <select className='drop-down'>
                {props.data.map((item) => <option value={item.value}>{item.display}</option>)}
            </select>
        </div>
    )
}