import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const COURSE_DATA = [
  { code: 'COMP202', title: 'Foundations of Programming' },
  { code: 'COMP250', title: 'Introduction to Computer Science' },
  { code: 'MATH240', title: 'Discrete Structures' },
  { code: 'MATH222', title: 'Calculus 3' }
];

export default function CoursesPage() {
  const [query, setQuery] = useState('');
  const [semesterIndex, setSemesterIndex] = useState(0);
  const [plan, setPlan] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('plan', JSON.stringify(plan));
  }, [plan]);

  const filteredCourses = COURSE_DATA.filter(
    c => c.code.toLowerCase().includes(query.toLowerCase()) ||
         c.title.toLowerCase().includes(query.toLowerCase())
  );

  const handleDrop = (e) => {
    e.preventDefault();
    const code = e.dataTransfer.getData('text/plain');
    setPlan(prev => {
      const courses = prev[semesterIndex] ? [...prev[semesterIndex]] : [];
      if (!courses.includes(code)) courses.push(code);
      return { ...prev, [semesterIndex]: courses };
    });
  };

  const onDragStart = (e, code) => {
    e.dataTransfer.setData('text/plain', code);
  };

  return (
    <div className="courses-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search courses"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className="results">
        {filteredCourses.map(course => (
          <div
            key={course.code}
            className="course-item"
            draggable
            onDragStart={e => onDragStart(e, course.code)}
          >
            {course.code} - {course.title}
          </div>
        ))}
      </div>

      <div className="semester-nav">
        <button
          onClick={() => setSemesterIndex(i => Math.max(0, i - 1))}
        >
          &lt;
        </button>
        <span>Semester {semesterIndex + 1}</span>
        <button onClick={() => setSemesterIndex(i => i + 1)}>&gt;</button>
      </div>

      <div
        className="semester-dropzone"
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
      >
        {(plan[semesterIndex] || []).map(code => (
          <div key={code} className="planned-course">
            {code}
          </div>
        ))}
      </div>

      <div className="review-button-wrapper">
        <button onClick={() => navigate('/review')} className="review-button">
          Review &amp; Submit
        </button>
      </div>
    </div>
  );
}
