import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [applications, setApplications] = useState([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, paid: 0 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const fetchApplications = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            const config = { headers: { Authorization: `Bearer ${token}` } };

            const [appsRes, statsRes] = await Promise.all([
                axios.get('/api/admin/applications', config),
                axios.get('/api/admin/dashboard', config)
            ]);

            setApplications(appsRes.data);
            setStats(statsRes.data);
        } catch (err) {
            setError('Sessão expirada ou erro ao buscar dados. Faça login novamente.');
            if (err.response.status === 401) {
                localStorage.removeItem('adminToken');
                navigate('/admin');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('adminToken');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            await axios.put(`/api/admin/applications/${id}`, { status: newStatus }, config);
            fetchApplications(); // Recarrega os dados após a alteração
        } catch (err) {
             setError('Não foi possível atualizar o status.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    if (loading) return <p>Carregando dashboard...</p>;

    return (
        <div className="admin-dashboard">
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h1>Painel Administrativo</h1>
                <button onClick={handleLogout} className="button button-secondary">Sair</button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <section className="stats-grid">
                <div className="stat-card"><h3>Total</h3><p>{stats.total}</p></div>
                <div className="stat-card"><h3>Pendentes</h3><p>{stats.pending}</p></div>
                <div className="stat-card"><h3>Aprovados</h3><p>{stats.approved}</p></div>
                <div className="stat-card"><h3>Pagos</h3><p>{stats.paid}</p></div>
            </section>

            <section className="application-list">
                <h2>Inscrições Recebidas</h2>
                <div style={{overflowX: 'auto'}}>
                 <table>
                    <thead>
                        <tr>
                            <th>Aluno</th>
                            <th>Curso</th>
                            <th>Contato</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.length === 0 ? (
                            <tr><td colSpan="5">Nenhuma inscrição encontrada.</td></tr>
                        ) : (
                           applications.map(app => (
                            <tr key={app.id}>
                                <td>{app.student_name}</td>
                                <td>{app.course_title}</td>
                                <td>{app.student_email}<br/>{app.student_whatsapp}</td>
                                <td>{app.status}</td>
                                <td>
                                    <select value={app.status} onChange={(e) => handleStatusChange(app.id, e.target.value)}>
                                        <option value="Pendente">Pendente</option>
                                        <option value="Aprovado">Aprovado</option>
                                        <option value="Rejeitado">Rejeitado</option>
                                        <option value="Pago">Pago</option>
                                    </select>
                                </td>
                            </tr>
                           ))
                        )}
                    </tbody>
                </table>
                </div>
            </section>
        </div>
    );
};

export default AdminDashboard;