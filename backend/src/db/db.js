const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

// Configuração para produção (Render) usa a DATABASE_URL
// Configuração para desenvolvimento (local) usa as variáveis do .env
const connectionConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
};

const pool = isProduction ? new Pool(connectionConfig) : new Pool();

// Teste de Conexão
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Erro de conexão com o Banco de Dados:', err);
  } else {
    console.log('Conexão com o Banco de Dados estabelecida com sucesso.');
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};