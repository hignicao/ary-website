import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  IoArrowBack,
  IoMailOutline,
  IoLogoWhatsapp,
  IoLocationOutline,
  IoPersonOutline,
  IoSendOutline
} from "react-icons/io5";

const Enrollment = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    address: '',
  });
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axios.get(`/api/courses/${courseId}`);
        setCourse(data);
      } catch (err) {
        setError('Não foi possível carregar o formulário para este curso.');
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [courseId]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAnswerChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
        const currentAnswers = answers[name] || [];
        if(checked) {
            setAnswers({...answers, [name]: [...currentAnswers, value]});
        } else {
            setAnswers({...answers, [name]: currentAnswers.filter(v => v !== value)});
        }
    } else {
        setAnswers({ ...answers, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const submissionData = { ...formData, courseId, answers };
      await axios.post('/api/applications', submissionData);
      setSuccess('Sua inscrição foi enviada com sucesso! Entraremos em contato em breve com os próximos passos.');
      setFormData({ name: '', email: '', whatsapp: '', address: '' });
      setAnswers({});
      setTimeout(() => navigate('/'), 5000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Ocorreu um erro ao enviar sua inscrição. Verifique os dados e tente novamente.');
    }
  };

  const renderQuestion = (q) => {
    // Labels do questionário não terão ícones para não poluir
    const questionLabel = <label htmlFor={q.id} style={{fontWeight: 'bold', color: 'var(--primary-color)'}}>{q.label}</label>

    switch (q.type) {
        case 'text':
            return <div className="form-group" key={q.id}>
                {questionLabel}
                <input type="text" id={q.id} name={q.id} value={answers[q.id] || ''} onChange={handleAnswerChange} placeholder={q.placeholder || ''} />
            </div>;
        case 'radio':
            return <div className="form-group" key={q.id}>
                {questionLabel}
                <div className="radio-group">{q.options.map(opt => (
                    <label key={opt}><input type="radio" name={q.id} value={opt} checked={answers[q.id] === opt} onChange={handleAnswerChange} /> {opt}</label>
                ))}</div>
            </div>;
        case 'checkbox':
             return <div className="form-group" key={q.id}>
                {questionLabel}
                <div className="checkbox-group">{q.options.map(opt => (
                    <label key={opt}><input type="checkbox" name={q.id} value={opt} checked={answers[q.id]?.includes(opt)} onChange={handleAnswerChange} /> {opt}</label>
                ))}</div>
            </div>;
        default:
            return null;
    }
  }

  if (loading) return <p>Carregando formulário...</p>;

  return (
    <div className="form-container">
      <button onClick={() => navigate(-1)} className="button-back" style={{marginBottom: '1.5rem'}}>
        <IoArrowBack /> Voltar
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {!success && (
        <form onSubmit={handleSubmit}>
          <h1>Formulário de Inscrição</h1>
          <h3>Curso: {course?.title}</h3>

          <h2>Dados Pessoais (Preencher e enviar)</h2>
          <div className="form-group">
            <label htmlFor="name"><IoPersonOutline /> Nome Completo</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleFormChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email"><IoMailOutline /> E-mail</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleFormChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="whatsapp"><IoLogoWhatsapp /> WhatsApp (com DDD)</label>
            <input type="text" id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label htmlFor="address"><IoLocationOutline /> Endereço Completo</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleFormChange} placeholder="CEP, Rua, Nº, Bairro, Cidade, Estado, País" />
          </div>

          <h2>Questionário (Preencher e enviar)</h2>
          {course?.questionnaire.questions.map(q => renderQuestion(q))}

          <button type="submit" className="button">
            <IoSendOutline /> Enviar Inscrição
          </button>

          <div className="contact-info">
            <h3>Endereço para Envio de Inscrição</h3>
            <p><IoPersonOutline /> <strong>Nome:</strong> ARY VIEIRA BARRADAS</p>
            <p><IoMailOutline /> <strong>E-mail:</strong> barradasary@gmail.com</p>
            <p><IoLogoWhatsapp /> <strong>WhatsApp:</strong> +55 21 999635847</p>
            <p><IoLocationOutline /> <strong>Endereço:</strong> CEP: 22.231.110; Rua: Coelho Neto – Nº 49 – Ap. 401 – Laranjeiras – Rio de Janeiro – Brasil</p>
          </div>
        </form>
      )}
    </div>
  );
};

export default Enrollment;