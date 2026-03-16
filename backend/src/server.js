require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet'); // Proteção de cabeçalhos
const rateLimit = require('express-rate-limit'); // Proteção contra força bruta

// Importação das Rotas
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const applicationsRoutes = require('./routes/applications');

// Importações de Banco de Dados
const { initDb } = require('./db/init');
const seedAdmin = require('./utils/adminSeed');
const seedCourses = require('./utils/courseSeed');

const startServer = async () => {
  try {
    console.log('Inicializando Banco de Dados...');
    await initDb();
    await seedAdmin();
    await seedCourses();
    console.log('Banco de Dados pronto.');

    const app = express();
    const PORT = process.env.PORT || 5000;

    // --- CAMADA DE SEGURANÇA 1: HELMET ---
    // Esconde que o site usa Express e protege contra ataques XSS
    app.use(helmet());

    // --- CAMADA DE SEGURANÇA 2: CORS RESTRITO ---
    // ATENÇÃO: Troque a URL abaixo pela URL real do seu Frontend no Render
    const allowedOrigins = [
      'http://localhost:3000', // Permite o seu PC local para testes
      'https://front-ary-website.onrender.com/', // Coloque a URL do Render do Frontend
      'https://www.matfinanceiraeestatistica.com.br/', // Se for usar domínio próprio, adicione aqui
      'https://matfinanceiraeestatistica.com.br/'
    ];

    app.use(cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback(new Error('Acesso bloqueado pela política de CORS'));
        }
      }
    }));

    // --- CAMADA DE SEGURANÇA 3: RATE LIMITING ---
    // Protege a rota de login contra robôs tentando adivinhar a senha
    const loginLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutos de bloqueio
      max: 5, // Bloqueia após 5 tentativas erradas por IP
      message: { message: 'Muitas tentativas de login. Por favor, aguarde 15 minutos.' }
    });

    app.use(express.json());

    // Aplica o limitador APENAS na rota de login (para não travar alunos normais)
    app.use('/api/admin/login', loginLimiter, adminRoutes);

    // Rotas da Aplicação
    app.use('/api', publicRoutes);
    app.use('/api/admin', adminRoutes); // As outras rotas do admin ficam normais
    app.use('/api/applications', applicationsRoutes);

    app.get('/', (req, res) => {
      res.send('API do Professor Ary está no ar e segura!');
    });

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Backend server is running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Falha crítica ao iniciar servidor:', err);
  }
};

startServer();