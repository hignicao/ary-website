require('dotenv').config();
const express = require('express');
const cors = require('cors');
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { initializeAdmin } = require('./controllers/adminController');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api', publicRoutes);
app.use('/api/admin', adminRoutes);

// Rota de health check
app.get('/', (req, res) => {
    res.send('API do Professor Ary está no ar!');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
    // Atraso para garantir que o DB esteja pronto antes de tentar inserir o admin
    setTimeout(initializeAdmin, 15000);
});