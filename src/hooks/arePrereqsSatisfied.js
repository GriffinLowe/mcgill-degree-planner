function arePrereqsSatisfied(completedCourses, plannedCourses) {
  const completedSet = new Set(completedCourses.map(c => c.course_code));
  const plannedSet = new Set(plannedCourses.map(c => c.course_code));
  const issues = [];

  for (const course of plannedCourses) {
    const unmetPrereqs = (course.prereqs || []).filter(pr => !completedSet.has(pr));
    const unmetCoreqs = (course.coreqs || []).filter(cr => !completedSet.has(cr) && !plannedSet.has(cr));

    if (unmetPrereqs.length > 0 || unmetCoreqs.length > 0) {
      issues.push({
        course_code: course.course_code,
        unmetPrereqs,
        unmetCoreqs
      });
    }
  }

  return {
    valid: issues.length === 0,
    issues
  };
}
