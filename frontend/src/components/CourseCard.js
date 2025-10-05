import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <div className="course-card-content">
        <h3>{course.title}</h3>
        <ul className="course-card-details">
          <li><strong>Carga Horária:</strong> {course.workload} horas</li>
          <li><strong>Horário:</strong> {course.schedule}</li>
          <li><strong>Investimento:</strong> R$ {Number(course.price).toFixed(2).replace('.', ',')}</li>
        </ul>
      </div>
       <div className="course-card-footer">
         <Link to={`/curso/${course.id}`} className="button">
            Mais Detalhes
        </Link>
       </div>
    </div>
  );
};

export default CourseCard;