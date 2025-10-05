const db = require('../db/db');

// @desc    Buscar todos os cursos
// @route   GET /api/courses
exports.getCourses = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT id, title, workload, price, schedule FROM courses');
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Buscar um curso por ID
// @route   GET /api/courses/:id
exports.getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await db.query('SELECT * FROM courses WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ msg: 'Curso não encontrado' });
        }
        res.json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Criar uma nova inscrição
// @route   POST /api/applications
exports.createApplication = async (req, res) => {
    const { courseId, name, email, whatsapp, address, cv, answers } = req.body;

    if (!courseId || !name || !email || !answers) {
        return res.status(400).json({ msg: 'Por favor, preencha todos os campos obrigatórios.' });
    }

    try {
        // Inserir na tabela de applications
        const applicationResult = await db.query(
            'INSERT INTO applications (course_id, student_name, student_email, student_whatsapp, student_address, student_cv) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [courseId, name, email, whatsapp, address, cv]
        );
        const applicationId = applicationResult.rows[0].id;

        // Inserir respostas do questionário
        const answerPromises = Object.entries(answers).map(([question, answer]) => {
             const answerText = Array.isArray(answer) ? answer.join(', ') : answer;
             return db.query(
                'INSERT INTO questionnaire_answers (application_id, question, answer) VALUES ($1, $2, $3)',
                [applicationId, question, answerText]
            );
        });

        await Promise.all(answerPromises);

        res.status(201).json({ msg: 'Inscrição enviada com sucesso! Você será notificado sobre os próximos passos por e-mail.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};