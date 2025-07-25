import React, { useEffect, useState } from 'react';
import './index.scss';

export default function ReviewPage() {
  const [plan, setPlan] = useState({});
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('plan');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPlan(parsed);
        const problems = [];
        const seen = new Set();
        Object.values(parsed).forEach(codes => {
          if (codes.length > 5) problems.push('More than 5 courses in a semester');
          codes.forEach(code => {
            if (seen.has(code)) problems.push(`Duplicate course: ${code}`);
            seen.add(code);
          });
        });
        setIssues(problems);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const semesters = Object.keys(plan).sort((a, b) => Number(a) - Number(b));

  return (
    <div className="review-page">
      <div className="review-left">
        {semesters.map(index => (
          <div key={index} className="review-semester">
            <h3>Semester {Number(index) + 1}</h3>
            {(plan[index] || []).map(code => (
              <div key={code} className="review-course">{code}</div>
            ))}
          </div>
        ))}
      </div>
      <div className="review-right">
        <h2>Schedule Check</h2>
        {issues.length ? (
          <ul>
            {issues.map((i, idx) => (
              <li key={idx}>{i}</li>
            ))}
          </ul>
        ) : (
          <p>No issues found.</p>
        )}
      </div>
    </div>
  );
}
