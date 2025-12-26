require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importação das Rotas
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const applicationsRoutes = require('./routes/applications'); // <--- ADICIONADO AQUI

const { initializeAdmin } = require('./controllers/adminController');
const { initDb } = require('./db/init');

const startServer = async () => {
  // Primeiro, garante que o banco de dados está pronto
  await initDb();

  const app = express();
  const PORT = process.env.PORT || 5000;

  // Middlewares
  app.use(cors());
  app.use(express.json());

  // Definição das Rotas
  app.use('/api', publicRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/applications', applicationsRoutes); // <--- ADICIONADO AQUI

  // Rota de health check
  app.get('/', (req, res) => {
    res.send('API do Professor Ary está no ar!');
  });

  // Iniciar o servidor com a correção de endereço
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
    // Atraso para garantir que o DB esteja pronto antes de tentar inserir o admin
    setTimeout(initializeAdmin, 5000);
  });
};

startServer();