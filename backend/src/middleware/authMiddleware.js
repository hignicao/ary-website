const jwt = require('jsonwebtoken');
const db = require('../db/db');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Verifica se o usuário do token existe no DB (opcional, mas seguro)
            const { rows } = await db.query('SELECT id FROM admins WHERE id = $1', [decoded.id]);
            if(rows.length > 0) {
                req.admin = rows[0];
                next();
            } else {
                res.status(401).json({ message: 'Não autorizado, token inválido' });
            }

        } catch (error) {
            res.status(401).json({ message: 'Não autorizado, token inválido' });
        }
    }
    if (!token) {
        res.status(401).json({ message: 'Não autorizado, sem token' });
    }
};

module.exports = { protect };