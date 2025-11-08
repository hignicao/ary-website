const fs = require('fs');
const path = require('path');
const db = require('./db');

const initDb = async () => {
  try {
    // Vamos sempre rodar o script.
    // O script SQL é "idempotente", o que significa que ele pode
    // ser executado várias vezes sem causar problemas.
    // - CREATE TABLE IF NOT EXISTS: não vai recriar tabelas.
    // - TRUNCATE TABLE: vai limpar os cursos antigos.
    // - INSERT INTO: vai inserir os cursos com o texto atualizado.

    console.log('Executando script de inicialização/atualização do banco de dados...');
    const sql = fs.readFileSync(path.join(__dirname, '../models/init.sql')).toString();
    await db.query(sql);
    console.log('Script do banco de dados executado com sucesso!');

  } catch (err) {
    console.error('Erro ao inicializar o banco de dados:', err);
    process.exit(1);
  }
};

module.exports = { initDb };