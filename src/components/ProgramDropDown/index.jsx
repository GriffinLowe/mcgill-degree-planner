import React from 'react';

const ProgramDropDown = (props) => {
    return (
        <div className='drop-down-wrapper'>
            <label htmlFor='drop-down'>{props.prompt}</label>
            <select className='drop-down' id='drop-down'>
                {props.data.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.display}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ProgramDropDown;
