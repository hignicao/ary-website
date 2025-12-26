import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoEyeOutline, IoClose, IoCheckmarkCircleOutline, IoCloseCircleOutline, IoCashOutline, IoMailOutline, IoLogOutOutline } from "react-icons/io5";

const AdminDashboard = () => {
	const [applications, setApplications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedApp, setSelectedApp] = useState(null); // Para o Modal
	const navigate = useNavigate();

	// Carregar dados
	const fetchApplications = async () => {
		try {
			const token = localStorage.getItem("token");
			if (!token) return navigate("/admin");

			const { data } = await axios.get("/api/applications", {
				headers: { Authorization: `Bearer ${token}` },
			});
			setApplications(data);
		} catch (err) {
			console.error(err);
			if (err.response && err.response.status === 401) {
				localStorage.removeItem("token");
				navigate("/admin");
			}
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchApplications();
	}, [navigate]);

	// Função para mudar status
	const updateStatus = async (id, newStatus) => {
		try {
			const token = localStorage.getItem("token");
			await axios.put(
				`/api/applications/${id}/status`,
				{ status: newStatus },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			// Atualiza a lista localmente e fecha modal se aberto
			fetchApplications();
			if (selectedApp) setSelectedApp({ ...selectedApp, status: newStatus });
			alert(`Status atualizado para: ${newStatus}`);
		} catch (error) {
			alert("Erro ao atualizar status");
		}
	};

	// Função para gerar Link de Email (Mailto)
	const generateEmailLink = (app, type) => {
		const subject = encodeURIComponent(`Atualização sobre sua inscrição: ${app.course_title}`);
		let body = "";

		if (type === "approve") {
			body = `Olá ${app.student_name},\n\nTemos o prazer de informar que sua pré-inscrição para o curso "${app.course_title}" foi APROVADA!\n\nPara prosseguir com sua matrícula e garantir sua vaga, por favor realize o pagamento conforme combinado.\n\nQualquer dúvida, estamos à disposição.\n\nAtenciosamente,\nProf. Ary Barradas`;
		} else if (type === "access") {
			body = `Olá ${app.student_name},\n\nPagamento confirmado! Seguem abaixo os dados de acesso ao material do curso:\n\nLink do Google Drive: [INSERIR LINK AQUI]\n\nBom estudo!\n\nAtenciosamente,\nProf. Ary Barradas`;
		} else if (type === "reject") {
			body = `Olá ${app.student_name},\n\nAgradecemos seu interesse no curso "${app.course_title}".\n\nInfelizmente, neste momento não poderemos prosseguir com sua inscrição devido à limitação de vagas (ou outro motivo).\n\nEsperamos vê-lo em uma próxima oportunidade.\n\nAtenciosamente,\nProf. Ary Barradas`;
		}

		return `mailto:${app.student_email}?subject=${subject}&body=${encodeURIComponent(body)}`;
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/admin");
	};

	if (loading)
		return (
			<div className="page-container">
				<p>Carregando painel...</p>
			</div>
		);

	return (
		<div className="page-container admin-dashboard" style={{ maxWidth: "1200px" }}>
			<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
				<h1>Painel Administrativo</h1>
				<button onClick={handleLogout} className="button button-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
					<IoLogOutOutline /> Sair
				</button>
			</div>

			{/* Tabela de Inscrições */}
			<div className="application-list" style={{ overflowX: "auto" }}>
				<table>
					<thead>
						<tr>
							<th>Data</th>
							<th>Aluno</th>
							<th>Curso</th>
							<th>WhatsApp</th>
							<th>Status</th>
							<th>Ações</th>
						</tr>
					</thead>
					<tbody>
						{Array.isArray(applications) && applications.length > 0 ? (
							applications.map((app) => (
								<tr key={app.id}>
									<td>{new Date(app.submission_date).toLocaleDateString()}</td>
									<td>{app.student_name}</td>
									<td>{app.course_title}</td>
									<td>{app.student_whatsapp}</td>
									<td>
										<span className={`status-badge ${app.status ? app.status.toLowerCase() : "pendente"}`}>{app.status || "Pendente"}</span>
									</td>
									<td>
										<button className="button" style={{ padding: "5px 10px", fontSize: "0.8rem" }} onClick={() => setSelectedApp(app)}>
											<IoEyeOutline /> Detalhes
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="6" style={{ textAlign: "center", padding: "2rem" }}>
									Nenhuma inscrição encontrada ou erro ao carregar dados.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* --- MODAL DE DETALHES --- */}
			{selectedApp && (
				<div className="modal-overlay" onClick={() => setSelectedApp(null)}>
					<div className="modal-content" onClick={(e) => e.stopPropagation()}>
						<div className="modal-header">
							<h2>Detalhes da Inscrição #{selectedApp.id}</h2>
							<button className="close-button" onClick={() => setSelectedApp(null)}>
								<IoClose />
							</button>
						</div>

						<div className="modal-body">
							<div className="info-grid">
								<div className="info-box">
									<label>Nome do Aluno</label>
									<p>{selectedApp.student_name}</p>
								</div>
								<div className="info-box">
									<label>Status Atual</label>
									<span className={`status-badge ${selectedApp.status.toLowerCase()}`}>{selectedApp.status}</span>
								</div>
								<div className="info-box">
									<label>Curso de Interesse</label>
									<p>{selectedApp.course_title}</p>
								</div>
								<div className="info-box">
									<label>Data da Inscrição</label>
									<p>{new Date(selectedApp.submission_date).toLocaleString()}</p>
								</div>
								<div className="info-box">
									<label>E-mail</label>
									<p>{selectedApp.student_email}</p>
								</div>
								<div className="info-box">
									<label>WhatsApp</label>
									<p>{selectedApp.student_whatsapp}</p>
								</div>
								<div className="info-box" style={{ gridColumn: "1 / -1" }}>
									<label>Endereço</label>
									<p>{selectedApp.student_address}</p>
								</div>
							</div>

							<h3>Respostas do Questionário</h3>
							<div className="answers-section">
								{selectedApp.answers && selectedApp.answers.length > 0 ? (
									selectedApp.answers.map((ans, idx) => (
										<div key={idx} className="answer-item">
											{/* O código das perguntas é 'graduacao', 'cursou_mf', etc. Vamos tentar deixar mais legível se possível, ou exibir o código mesmo */}
											<strong>{ans.question}</strong>
											<span>{ans.answer}</span>
										</div>
									))
								) : (
									<p>Nenhuma resposta registrada.</p>
								)}
							</div>
						</div>

						<div className="modal-actions">
							{/* Botões de Ação de E-mail */}
							<a href={generateEmailLink(selectedApp, "approve")} className="button" style={{ backgroundColor: "#28a745" }}>
								<IoMailOutline /> Enviar Aprovação
							</a>

							<a href={generateEmailLink(selectedApp, "access")} className="button" style={{ backgroundColor: "#007bff" }}>
								<IoMailOutline /> Enviar Acesso (Drive)
							</a>

							{/* Botões de Mudança de Status */}
							<div style={{ borderLeft: "1px solid #ccc", paddingLeft: "1rem", display: "flex", gap: "0.5rem" }}>
								<button onClick={() => updateStatus(selectedApp.id, "Aprovado")} className="button" style={{ backgroundColor: "#28a745" }} title="Marcar como Aprovado">
									<IoCheckmarkCircleOutline /> Aprovar
								</button>

								<button onClick={() => updateStatus(selectedApp.id, "Pago")} className="button" style={{ backgroundColor: "#17a2b8" }} title="Confirmar Pagamento">
									<IoCashOutline /> Pago
								</button>

								<button onClick={() => updateStatus(selectedApp.id, "Rejeitado")} className="button" style={{ backgroundColor: "#dc3545" }} title="Rejeitar Inscrição">
									<IoCloseCircleOutline /> Rejeitar
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default AdminDashboard;
