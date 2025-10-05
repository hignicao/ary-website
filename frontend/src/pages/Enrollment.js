import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Enrollment = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    address: '',
    cv: '',
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
      // Limpar formulário
      setFormData({ name: '', email: '', whatsapp: '', address: '', cv: '' });
      setAnswers({});
      setTimeout(() => navigate('/'), 5000);
    } catch (err) {
      setError(err.response?.data?.msg || 'Ocorreu um erro ao enviar sua inscrição. Verifique os dados e tente novamente.');
    }
  };

  const renderQuestion = (q) => {
    switch (q.type) {
        case 'text':
            return <input type="text" id={q.id} name={q.id} value={answers[q.id] || ''} onChange={handleAnswerChange} placeholder={q.placeholder || ''} />;
        case 'radio':
            return <div className="radio-group">{q.options.map(opt => (
                <label key={opt}><input type="radio" name={q.id} value={opt} checked={answers[q.id] === opt} onChange={handleAnswerChange} /> {opt}</label>
            ))}</div>;
        case 'checkbox':
            return <div className="checkbox-group">{q.options.map(opt => (
                 <label key={opt}><input type="checkbox" name={q.id} value={opt} checked={answers[q.id]?.includes(opt)} onChange={handleAnswerChange} /> {opt}</label>
            ))}</div>;
        default:
            return null;
    }
  }

  if (loading) return <p>Carregando formulário...</p>;

  return (
    <div className="form-container">
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      {!success && (
        <form onSubmit={handleSubmit}>
          <h1>Formulário de Inscrição</h1>
          <h3>Curso: {course?.title}</h3>

          <h2>Dados Pessoais</h2>
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleFormChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleFormChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="whatsapp">WhatsApp (com DDD)</label>
            <input type="text" id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Endereço Completo</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleFormChange} />
          </div>
          <div className="form-group">
            <label htmlFor="cv">Currículo Resumido</label>
            <textarea id="cv" name="cv" value={formData.cv} onChange={handleFormChange}></textarea>
          </div>

          <h2>Questionário</h2>
          {course?.questionnaire.questions.map(q => (
             <div className="form-group" key={q.id}>
                <label htmlFor={q.id}>{q.label}</label>
                {renderQuestion(q)}
            </div>
          ))}

          <button type="submit" className="button">Enviar Inscrição</button>
        </form>
      )}
    </div>
  );
};

export default Enrollment;