import React from 'react';
import { Link } from 'react-router-dom'; // Usando Link
import {
  IoArrowBack,
  IoSchoolOutline,
  IoSearchOutline,
  IoPeopleOutline,
  IoBookOutline,
  IoDocumentTextOutline
} from "react-icons/io5";
import Hero from '../components/Hero';

const Curriculum = () => {
  return (
    <>
      <Link to="/" className="button-back">
        <IoArrowBack /> Voltar ao Início
      </Link>

      <Hero title="Currículo do Professor">
        <img
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wzNzc0fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA&ixlib=rb-4.0.3&q=80&w=1080"
          alt="Biblioteca"
        />
      </Hero>

      <div className="page-container">
        <h1>Prof. Ary Vieira Barradas</h1>

        <section>
          <h2 className="icon-heading"><IoSchoolOutline /> Formação</h2>
          <ul className="icon-list">
              <li><strong>Pós-Doutorado:</strong> ISCTE – Universidade de Lisboa – Portugal (2016)</li>
              <li><strong>Doutorado em Engenharia de Produção:</strong> COPPE-UFRJ</li>
              <li><strong>Posição:</strong> Professor Associado IV - Instituto de Economia – UFRJ</li>
          </ul>
        </section>

        <section>
          <h2 className="icon-heading"><IoSearchOutline /> Áreas de Pesquisa</h2>
          <p style={{marginLeft: '0.5rem'}}>Economia Financeira e Economia do Audiovisual (Cinema – TV e Vídeo)</p>
        </section>

        <section>
          <h2 className="icon-heading"><IoPeopleOutline /> Coordenação de Cursos</h2>
          <ul className="icon-list">
            <li>Gestão de Finanças em Seguros.</li>
            <li>Gestão de Seguros, Previdência, Capitalização e Administração Pública</li>
            <li>Regulação do Mercado de Capitais.</li>
            <li>Regulação da Atividade Cinematográfica e do Audiovisual – Ancine</li>
          </ul>
        </section>

        <section>
          <h2 className="icon-heading"><IoBookOutline /> Coautoria de Livro</h2>
          <ul className="icon-list">
              <li><strong>Título:</strong> CONQUISTANDO O SEU FUTURO FINANCEIRO – PLANEJAMENTO EM TEMPOS DE INCERTEZAS</li>
              <li><strong>Editora:</strong> Alta Brooks</li>
          </ul>
        </section>

        <section>
          <h2 className="icon-heading"><IoDocumentTextOutline /> Pesquisas Recentes e Trabalhos Publicados</h2>
          <ul className="icon-list">
              <li>Membro do grupo de pesquisa GENT – Grupo de Estudos em Economia da Cultura –Instituto de Economia-UFRJ.</li>
              <li>Coordenação do "Estudio sobre la Cadena de Valor del Sector Audiovisual en el Mercosur" (RECAM), financiado pela União Europeia.</li>
              <li>Diversos textos didáticos e artigos publicados pelo Instituto de Economia - UFRJ, focando em temas como a indústria do cinema no Mercosul, mercado audiovisual brasileiro, política industrial para o setor e análise de riscos na produção audiovisual.</li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default Curriculum;