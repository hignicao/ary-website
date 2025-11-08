import React from 'react';
import { Link } from 'react-router-dom';
import { IoTimeOutline, IoCalendarOutline, IoPricetagOutline } from "react-icons/io5";

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <div className="course-card-content">
        <h3>{course.title}</h3>
        <ul className="course-card-details">
          <li>
            <IoTimeOutline />
            <strong>Carga Horária:</strong> {course.workload} horas
          </li>
          <li>
            <IoCalendarOutline />
            <strong>Horário:</strong> {course.schedule}
          </li>
          <li>
            <IoPricetagOutline />
            <strong>Investimento:</strong> R$ {Number(course.price).toFixed(2).replace('.', ',')}
          </li>
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