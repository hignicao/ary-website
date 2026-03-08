const pool = require('../db/db'); // Ajuste o caminho conforme sua estrutura
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  try {
    // 1. Verifica se já existe algum admin
    const checkQuery = await pool.query('SELECT count(*) FROM admins');
    const count = parseInt(checkQuery.rows[0].count);

    if (count === 0) {
      console.log('Nenhum administrador encontrado. Criando admin padrão...');

      // Pega usuário e senha das variáveis de ambiente (ou usa padrão fraco se não tiver)
      const username = process.env.ADMIN_USERNAME || 'admin';
      const password = process.env.ADMIN_PASSWORD || '123456';

      // Gera o hash
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      // Insere no banco
      await pool.query(
        'INSERT INTO admins (username, password_hash) VALUES ($1, $2)',
        [username, hash]
      );

      console.log(`Admin criado com sucesso! Usuário: ${username}`);
    } else {
      console.log('Administrador já existe. Pulei a criação.');
    }
  } catch (err) {
    console.error('Erro ao verificar/criar admin:', err);
  }
};

module.exports = seedAdmin;