require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Importação das Rotas
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const applicationsRoutes = require('./routes/applications');

// Importações de Banco de Dados
const { initDb } = require('./db/init');
const seedAdmin = require('./utils/adminSeed');
const seedCourses = require('./utils/courseSeed'); // <--- 1. IMPORTAR

const startServer = async () => {
  try {
    // 2. Inicialização sequencial do Banco
    console.log('Inicializando Banco de Dados...');
    await initDb();       // Cria tabelas (se não existirem)
    await seedAdmin();    // Cria admin (se não existir)
    await seedCourses();  // Cria cursos (se não existirem) <--- 3. EXECUTAR
    console.log('Banco de Dados pronto.');

    const app = express();
    const PORT = process.env.PORT || 5000;

    app.use(cors());
    app.use(express.json());

    app.use('/api', publicRoutes);
    app.use('/api/admin', adminRoutes);
    app.use('/api/applications', applicationsRoutes);

    app.get('/', (req, res) => {
      res.send('API do Professor Ary está no ar!');
    });

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Backend server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Falha crítica ao iniciar servidor:', err);
  }
};

startServer();