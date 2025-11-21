import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoAddCircleOutline, IoRemoveCircleOutline, IoArrowBack } from "react-icons/io5"; // Ícones mais modernos (Circle)
import Hero from '../components/Hero';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <div className="faq-question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        {/* Troca o ícone dependendo do estado */}
        {isOpen ? <IoRemoveCircleOutline /> : <IoAddCircleOutline />}
      </div>
      {isOpen && <div className="faq-answer">{answer}</div>}
    </div>
  );
};

const FAQ = () => {
  const questions = [
    {
      q: "As aulas são presenciais ou online?",
      a: "As aulas são apresentadas 100% online e gravadas. O aluno terá acesso às gravações e aos exercícios práticos disponibilizados no site a qualquer momento, permitindo flexibilidade total de horário."
    },
    {
      q: "Como funcionam as aulas de exercícios?",
      a: "As dúvidas sobre conteúdos e exercícios não resolvidos serão esclarecidas pelo auxiliar do professor nas aulas de exercício ao vivo, que ocorrem às quintas-feiras. Também é possível tirar dúvidas através do e-mail do auxiliar."
    },
    {
      q: "Preciso ter a calculadora HP 12C?",
      a: "Sim, o uso da calculadora financeira HP 12C é fundamental para o acompanhamento do curso de Matemática Financeira, juntamente com o uso do Excel. Caso você ainda não saiba usar, não se preocupe: o curso ensinará o passo a passo."
    },
    {
      q: "Receberei um certificado ao final do curso?",
      a: "Sim. Ao final do curso, será concedido um certificado de participação e conclusão aos alunos que entregarem as atividades propostas."
    },
    {
      q: "Como é feito o pagamento?",
      a: "A inscrição no site não cobra pagamento imediato. Após preencher o formulário, seus dados serão analisados. Sendo aprovado, você receberá as instruções para realizar o pagamento (à vista ou parcelado via cheque pré-datado/PIX) diretamente com a coordenação."
    },
    {
      q: "Posso fazer os dois cursos ao mesmo tempo?",
      a: "Com certeza. Você pode se inscrever em um único curso ou no combo (Matemática Financeira + Estatística Básica). O conteúdo é complementar e enriquecedor para sua formação."
    }
  ];

  return (
    <>
      <Link to="/" className="button-back">
        <IoArrowBack /> Voltar ao Início
      </Link>

      <div className="page-container">
        <h1>Dúvidas Frequentes</h1>
        <p style={{marginBottom: '2rem', color: '#555'}}>
          Confira abaixo as respostas para as principais dúvidas sobre a metodologia, ferramentas e processos dos nossos cursos.
        </p>

        <div className="faq-list">
          {questions.map((item, index) => (
            <FAQItem key={index} question={item.q} answer={item.a} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQ;