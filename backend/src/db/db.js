const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

// Configuração para produção (Render) usa a DATABASE_URL
const productionConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
};

// Configuração para desenvolvimento (Docker local) usa as variáveis do .env
const developmentConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

// Seleciona a configuração correta
const pool = new Pool(isProduction ? productionConfig : developmentConfig);

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