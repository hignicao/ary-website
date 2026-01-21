import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseCard from '../components/CourseCard';
import Hero from '../components/Hero';

import bannerHome from '../assets/images/banner.png';
import descriptionHome from '../assets/images/description.png';

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
          src={bannerHome}
          alt="Pessoa de frente ao computador estudando"
        />
      </Hero>

      <section className="home-welcome page-container">
        <div className="two-column-layout">
          <div className="column-text">
            <p>
              Com as inovações tecnólogicas recentes as empresas do setor público e privado passaram a exigir dos candidatos a cargos ou funções técnicas  desempenhos que os obrigam a adquirir novos conhecimentos teóricos, conhecimentos esses que não foram obtidos na formação escolar do pretendente, quer seja de nível superior ou não.
            </p>
            <p>
              Em novos Editais de Concursos, esses conhecimentos aparecem quando os conteúdos exigidos são apresentados aos proponentes aos cargos. É o caso de concursos públicos para empresas estatais, tais como, BNDES, Petrobras, Banco do Brasil, CEF-Caixa Econômica Federal, CVM-Comissão de Valores Mobiliários, SUSEP-Superintendência de Seguros Privados, INPI-Instituto Nacional de Patentes Industriais, ou em Ministérios que exigem Técnicos de Nível Superior Específicos.
            </p>
            <p>
              Grande parte desses conteúdos  pode estar no escopo das disciplinas dos cursos de Matemática Financeira e Estatística Básica oferecidos aqui. Independente dessa utilização, na economia financeira há diversas formas através das quais as pessoas e as empresas podem analisar situações envolvendo a variação do dinheiro no tempo e também fazer as aplicações das suas reservas no mercado financeiro. Uma delas é utilizando os conceitos básicos da Matemática Financeira, juntamente com outros conteúdos de estatística associados.
            </p>
          </div>
          <div className="column-image">
            <img
              src={descriptionHome}
              alt="Profissionais em reunião"
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