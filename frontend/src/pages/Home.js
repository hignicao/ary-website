import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get('/api/courses');
        setCourses(data);
      } catch (err) {
        setError('Não foi possível carregar os cursos. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <p>Carregando cursos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <section className="home-welcome">
        <h1>Qualificação Profissional ao seu Alcance</h1>
        <p>
          Em um mercado de trabalho cada vez mais competitivo, o conhecimento especializado é o seu maior diferencial. Nossos cursos de Matemática Financeira e Estatística Básica são projetados para desenvolver seu raciocínio lógico, preencher lacunas de conhecimento e prepará-lo para os mais exigentes concursos públicos e processos seletivos.
        </p>
      </section>

      <h2>Cursos Oferecidos</h2>
      <div className="courses-grid">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Home;