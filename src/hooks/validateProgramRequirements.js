function validateProgramRequirements(program, completedCourses, coursePlan) {
  const completedMap = new Map();
  completedCourses.forEach(course => completedMap.set(course.course_code, course));

  const plannedMap = new Map();
  coursePlan.flat().forEach(course => plannedMap.set(course.course_code, course));

  const allCoursesMap = new Map([...completedMap, ...plannedMap]);

  // Helper: checks if all courses in course list are completed or planned
  function areCoursesPresent(courseList) {
    return courseList.every(course => allCoursesMap.has(course.course_code));
  }

  // 1. Validate required courses are all completed or planned
  for (const section of program.course_sections) {
    if (section.category === "required") {
      if (!areCoursesPresent(section.course_list)) return false;
    }
  }

  // 2. Validate credit ranges for all sections
  for (const section of program.course_sections) {
    let totalCredits = 0;

    for (const course of section.course_list) {
      if (allCoursesMap.has(course.course_code)) {
        totalCredits += course.credits;
      }
    }

    // Handle course_range logic
    if (section.course_range) {
      const { codes, levels } = section.course_range;
      for (const course of allCoursesMap.values()) {
        const [prefix, number] = course.course_code.split(" ");
        const level = parseInt(number[0], 10);
        if (codes.includes(prefix) && levels.includes(level)) {
          totalCredits += course.credits;
        }
      }
    }

    if (totalCredits < section.min_credits) return false;
    if (!section.ranged_credits && totalCredits !== section.max_credits) return false;
    if (section.ranged_credits && totalCredits > section.max_credits) return false;
  }

  // 3. Validate credit requirement configuration
  const totalCreditsEarned = Array.from(allCoursesMap.values()).reduce((sum, c) => sum + c.credits, 0);

  const isValidCreditConfig = program.credit_requirements.some(config => {
    const exemptionCredits = config.exemptions.reduce((sum, course) => {
      return allCoursesMap.has(course.course_code) ? sum + course.credits : sum;
    }, 0);

    return (totalCreditsEarned - exemptionCredits) >= config.credits;
  });

  return isValidCreditConfig;
}
