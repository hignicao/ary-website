import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';
import Hero from '../components/Hero';

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
      <Hero title="Qualificação Profissional ao seu Alcance">
        <img
          src="https://images.unsplash.com/photo-1542744095-291d1f67b221?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA&ixlib=rb-4.0.3&q=80&w=1080"
          alt="Reunião de negócios moderna"
        />
      </Hero>

      <section className="home-welcome page-container">
        <div className="two-column-layout">
          <div className="column-text">
            <h2>Bem-vindo ao nosso centro de qualificação</h2>
            <p>
              Com as inovações tecnólogicas recentes as empresas do setor público e privado passaram a exigir dos concorrentes a cargos ou funções técnicas, desempenhos que os obrigam a adquirir novos conhecimentos teóricos; conhecimentos estes, que não foram obtidos na formação escolar do pretendente, quer seja de nível superior ou não.
            </p>
            <p>
              Grande parte desses conteúdos, podem estar no escopo das disciplinas dos cursos de Matemática Financeira e Estatística Básica oferecidos aqui.
            </p>
          </div>
          <div className="column-image">
            <img
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Profissionais estudando em volta de um notebook"
            />
          </div>
        </div>
      </section>

      <h2 style={{marginTop: '3rem'}}>Cursos Oferecidos</h2>
      <div className="courses-grid">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default Home;