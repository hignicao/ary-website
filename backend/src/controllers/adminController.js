const db = require('../db/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '8h' });
};

// @desc    Inicializa o usuário admin se não existir
exports.initializeAdmin = async () => {
    try {
        const { rows } = await db.query('SELECT * FROM admins WHERE username = $1', ['admin']);
        if (rows.length === 0) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('admin123', salt);
            await db.query('INSERT INTO admins (username, password_hash) VALUES ($1, $2)', ['admin', hashedPassword]);
            console.log('Usuário "admin" inicializado com sucesso.');
        } else {
            console.log('Usuário "admin" já existe.');
        }
    } catch (err) {
        console.error('Erro ao inicializar o admin:', err.message);
    }
};

// @desc    Autenticar admin e obter token
// @route   POST /api/admin/login
exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const { rows } = await db.query('SELECT * FROM admins WHERE username = $1', [username]);
        if (rows.length > 0) {
            const admin = rows[0];
            const isMatch = await bcrypt.compare(password, admin.password_hash);
            if (isMatch) {
                res.json({
                    token: generateToken(admin.id),
                });
            } else {
                res.status(401).json({ message: 'Credenciais inválidas' });
            }
        } else {
            res.status(401).json({ message: 'Credenciais inválidas' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Buscar todas as inscrições
// @route   GET /api/admin/applications
exports.getApplications = async (req, res) => {
    try {
        const query = `
            SELECT
                a.id, a.student_name, a.student_email, a.student_whatsapp, a.status, a.submission_date,
                c.title as course_title,
                (SELECT json_agg(json_build_object('question', qa.question, 'answer', qa.answer))
                 FROM questionnaire_answers qa WHERE qa.application_id = a.id) as answers
            FROM applications a
            JOIN courses c ON a.course_id = c.id
            ORDER BY a.submission_date DESC
        `;
        const { rows } = await db.query(query);
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// @desc    Atualizar status de uma inscrição
// @route   PUT /api/admin/applications/:id
exports.updateApplicationStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const validStatuses = ['Pendente', 'Aprovado', 'Rejeitado', 'Pago'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Status inválido' });
        }

        const { rows } = await db.query(
            'UPDATE applications SET status = $1 WHERE id = $2 RETURNING *',
            [status, id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Inscrição não encontrada' });
        }

        // Aqui você poderia adicionar a lógica de envio de e-mail para o aluno
        console.log(`Status da inscrição ${id} atualizado para ${status}.`);

        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Obter estatísticas para o dashboard
// @route   GET /api/admin/dashboard
exports.getDashboardStats = async (req, res) => {
    try {
        const totalApps = await db.query('SELECT COUNT(*) FROM applications');
        const pendingApps = await db.query("SELECT COUNT(*) FROM applications WHERE status = 'Pendente'");
        const approvedApps = await db.query("SELECT COUNT(*) FROM applications WHERE status = 'Aprovado'");
        const paidApps = await db.query("SELECT COUNT(*) FROM applications WHERE status = 'Pago'");

        res.json({
            total: totalApps.rows[0].count,
            pending: pendingApps.rows[0].count,
            approved: approvedApps.rows[0].count,
            paid: paidApps.rows[0].count
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};