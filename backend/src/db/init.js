const fs = require('fs');
const path = require('path');
const db = require('./db');

const initDb = async () => {
  try {
    // 1. Verifica se a tabela 'courses' já existe.
    const res = await db.query("SELECT to_regclass('public.courses')");

    // Se a tabela já existe, não faz nada.
    if (res.rows[0].to_regclass) {
      console.log('Banco de dados já inicializado. Nenhuma ação necessária.');
      return;
    }

    // 2. Se a tabela não existe, lê e executa o script init.sql.
    console.log('Banco de dados não inicializado. Executando script de setup...');
    const sql = fs.readFileSync(path.join(__dirname, '../models/init.sql')).toString();
    await db.query(sql);
    console.log('Script do banco de dados executado com sucesso!');

  } catch (err) {
    console.error('Erro ao inicializar o banco de dados:', err);
    // Em caso de erro, encerra o processo para evitar que a aplicação rode com um estado inconsistente.
    process.exit(1);
  }
};

module.exports = { initDb };