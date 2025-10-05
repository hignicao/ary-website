import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`/api/courses/${id}`);
        setCourse(data);
      } catch (err) {
        setError('Curso não encontrado ou erro ao carregar.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <p>Carregando detalhes do curso...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!course) return <p>Nenhum curso para exibir.</p>;

  return (
    <div className="page-container">
      <h1>{course.title}</h1>
      <p>{course.syllabus.introducao}</p>

      <div className="details-grid">
        <div className="detail-item">
          <strong>Carga Horária</strong>
          <span>{course.workload} horas</span>
        </div>
        <div className="detail-item">
          <strong>Horário das Aulas</strong>
          <span>{course.schedule}</span>
        </div>
        <div className="detail-item">
          <strong>Investimento</strong>
          <span>R$ {Number(course.price).toFixed(2).replace('.', ',')}</span>
        </div>
         <div className="detail-item">
          <strong>Forma de Pagamento</strong>
          <span>{course.payment_info}</span>
        </div>
      </div>

      <h3>Metodologia</h3>
      <p>{course.methodology}</p>

      <h3>Conteúdo Programático</h3>
      <ul className="syllabus-list">
        {course.syllabus.items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to={`/inscricao/${course.id}`} className="button button-secondary">
          Inscreva-se Agora
        </Link>
      </div>
    </div>
  );
};

export default CourseDetail;