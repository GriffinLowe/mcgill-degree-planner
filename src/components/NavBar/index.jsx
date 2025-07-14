import React from 'react';
import { useNavigate } from 'react-router-dom'; // Needed to change pages

export default function NavBar() {
  const navigate = useNavigate(); // Hook for navigation

  function handleClick(page) {
    navigate(page); // Navigate to the provided route
  }

  function handleHover() {
    // Add hover logic if needed
    console.log("Hovered!");
  }

  return (
    <>
      <button
        className="nav-button"
        onClick={() => handleClick('/programs')}
        onMouseEnter={handleHover}
      >
        Explore Programs
      </button>

      <button
        className="nav-button"
        onClick={() => handleClick('/courses')}
        onMouseEnter={handleHover}
      >
        Courses
      </button>

      <button
        className="nav-button"
        onClick={() => handleClick('/review')}
        onMouseEnter={handleHover}
      >
        Review & Submit
      </button>
    </>
  );
}
