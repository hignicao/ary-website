const router = require('express').Router();
const db = require('../db/db'); // <--- CORREÇÃO: Caminho ajustado para '../db/db'
const { protect } = require('../middleware/authMiddleware');

// 1. Listar todas as inscrições (PROTEGIDO)
router.get('/', protect, async (req, res) => {
  try {
    const query = `
      SELECT
        a.*,
        c.title as course_title,
        COALESCE(
          json_agg(
            json_build_object('question', qa.question, 'answer', qa.answer)
          ) FILTER (WHERE qa.id IS NOT NULL),
          '[]'
        ) as answers
      FROM applications a
      LEFT JOIN courses c ON a.course_id = c.id
      LEFT JOIN questionnaire_answers qa ON a.id = qa.application_id
      GROUP BY a.id, c.title
      ORDER BY a.submission_date DESC;
    `;

    // Nota: db.query funciona se o seu arquivo db.js exportar o pool ou um wrapper de query
    const result = await db.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao buscar inscrições.' });
  }
});

// 2. Criar nova inscrição (PÚBLICO)
router.post('/', async (req, res) => {
  // Precisamos de um cliente dedicado para transações.
  // Se db.connect não existir (dependendo da sua config), teremos que ajustar.
  // Assumindo que 'db' é o Pool do 'pg'.
  const client = await db.connect();
  try {
    const { courseId, name, email, whatsapp, address, answers } = req.body;

    await client.query('BEGIN');

    // Inserir dados pessoais
    const appResult = await client.query(
      `INSERT INTO applications (course_id, student_name, student_email, student_whatsapp, student_address)
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [courseId, name, email, whatsapp, address]
    );
    const appId = appResult.rows[0].id;

    // Inserir respostas do questionário
    if (answers) {
      for (const [key, value] of Object.entries(answers)) {
         const finalValue = Array.isArray(value) ? value.join(', ') : value;

         await client.query(
           `INSERT INTO questionnaire_answers (application_id, question, answer) VALUES ($1, $2, $3)`,
           [appId, key, finalValue]
         );
      }
    }

    await client.query('COMMIT');
    res.status(201).json({ msg: 'Inscrição realizada com sucesso!' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ msg: 'Erro ao salvar inscrição.' });
  } finally {
    client.release();
  }
});

// 3. Atualizar Status (PROTEGIDO)
router.put('/:id/status', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    await db.query(
      'UPDATE applications SET status = $1 WHERE id = $2',
      [status, id]
    );

    res.json({ msg: 'Status atualizado com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Erro ao atualizar status.' });
  }
});

module.exports = router;