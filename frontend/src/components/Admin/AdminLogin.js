import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoLogInOutline } from "react-icons/io5";

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Faz o login no backend
      const { data } = await axios.post('/api/admin/login', { username, password });

      // Salva o token recebido
      if (data.token) {
        localStorage.setItem('token', data.token);
        // Redireciona para o Dashboard
        navigate('/admin/dashboard');
      } else {
        setError('Erro: Token não recebido do servidor.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Credenciais inválidas ou erro no servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container page-container" style={{maxWidth: '400px', marginTop: '4rem'}}>
      <h1>Acesso Restrito</h1>
      <p style={{textAlign: 'center', marginBottom: '2rem'}}>Área exclusiva para administração.</p>

      {error && <div style={{backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center'}}>{error}</div>}

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="username">Usuário</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="button" style={{width: '100%'}} disabled={loading}>
          {loading ? 'Entrando...' : <><IoLogInOutline /> Entrar</>}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;