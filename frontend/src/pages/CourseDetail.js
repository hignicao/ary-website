import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  IoArrowBack,
  IoArrowForward,
  IoCreateOutline,
  IoReaderOutline,
  IoFlaskOutline,
  IoLibraryOutline
} from "react-icons/io5";
import Hero from '../components/Hero';

// Função volta a retornar JSX (<img>)
const getHeroImage = (courseId) => {
  if (courseId == 1) {
    return (
      <img
        src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA&ixlib=rb-4.0.3&q=80&w=1080"
        alt="Gráficos financeiros"
      />
    );
  }
  if (courseId == 2) {
    return (
      <img
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA&ixlib=rb-4.0.3&q=80&w=1080"
        alt="Dashboards de estatística"
      />
    );
  }
  return (
    <img
      src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA&ixlib=rb-4.0.3&q=80&w=1080"
      alt="Biblioteca acadêmica"
    />
  );
};

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [nextCourse, setNextCourse] = useState(null);
  const [prevCourse, setPrevCourse] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      setError('');
      setNextCourse(null);
      setPrevCourse(null);

      try {
        const [courseDetailResponse, allCoursesResponse] = await Promise.all([
          axios.get(`/api/courses/${id}`),
          axios.get('/api/courses')
        ]);

        const currentCourse = courseDetailResponse.data;
        const allCourses = allCoursesResponse.data;

        if (currentCourse) {
          setCourse(currentCourse);
          const currentIndex = allCourses.findIndex(c => c.id == id);

          if (currentIndex !== -1) {
            if (currentIndex > 0) {
              const prev = allCourses[currentIndex - 1];
              setPrevCourse({ id: prev.id, title: prev.title });
            }
            if (currentIndex < allCourses.length - 1) {
              const next = allCourses[currentIndex + 1];
              setNextCourse({ id: next.id, title: next.title });
            }
          }
        } else {
          setError('Curso não encontrado.');
        }
      } catch (err) {
        setError('Curso não encontrado ou erro ao carregar.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourseData();
  }, [id]);

  const getNavStyle = () => {
    if (prevCourse && nextCourse) return { justifyContent: 'space-between' };
    if (!prevCourse && nextCourse) return { justifyContent: 'flex-end' };
    return { justifyContent: 'flex-start' };
  };

  if (loading) return <p>Carregando detalhes do curso...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!course) return <p>Nenhum curso para exibir.</p>;

  const heroImage = getHeroImage(course.id);
  const navStyle = getNavStyle();

  return (
    <>
      <Link to="/" className="button-back">
        <IoArrowBack /> Voltar ao Início
      </Link>

      <Hero title={course.title}>
        {heroImage}
      </Hero>

      <div className="page-container">
        <nav className="course-navigation" style={navStyle}>
          {prevCourse && (
            <Link to={`/curso/${prevCourse.id}`} className="course-nav-link prev">
              <IoArrowBack />
              <span>Anterior</span>
            </Link>
          )}
          {nextCourse && (
            <Link to={`/curso/${nextCourse.id}`} className="course-nav-link next">
              <span>Próximo</span>
              <IoArrowForward />
            </Link>
          )}
        </nav>

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
            <strong>Valor do curso</strong>
            <span>R$ {Number(course.price).toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="detail-item">
            <strong>Forma de Pagamento</strong>
            <span>{course.payment_info}</span>
          </div>
        </div>

        <h3 className="icon-heading">
          <IoReaderOutline /> Introdução
        </h3>
        <p>{course.syllabus.introducao}</p>

        <div className="two-column-layout" style={{marginTop: '2.5rem'}}>
          <div className="column-text">
            <h3 className="icon-heading">
              <IoFlaskOutline /> Metodologia
            </h3>
            <p>{course.methodology}</p>
          </div>
          <div className="column-image">
            <img
              src="https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Calculadora HP 12C clássica"
            />
          </div>
        </div>

        <h3 className="icon-heading">
          <IoLibraryOutline /> Conteúdo Programático
        </h3>

        <ul className="syllabus-list">
          {course.syllabus.items.map((item, index) => {
            const label = typeof item === 'object' ? item.label : item;
            const level = typeof item === 'object' ? item.level : 0;
            return (
              <li key={index} className={`syllabus-item level-${level}`}>
                {label}
              </li>
            );
          })}
        </ul>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to={`/inscricao/${course.id}`} className="button button-secondary">
            <IoCreateOutline /> Inscreva-se Agora
          </Link>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;