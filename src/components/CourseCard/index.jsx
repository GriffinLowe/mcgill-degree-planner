import { useDrag } from 'react-dnd';

export function CourseCard({ course }) {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    // labeling the kind of object you're dragging.
    type: 'COURSE',

    // payload you want to carry during the drag.
    item: {
      id: course.id,
      title: course.title,
      credits: course.credits,
    },

    //drag status so you can animate or hide it.
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef} // makes the DOM element draggable
    >
      {course.title} ({course.credits} credits)
    </div>
  );
}
