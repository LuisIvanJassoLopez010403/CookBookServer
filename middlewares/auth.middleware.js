const jwt = require('jsonwebtoken');
const JWT_SECRET = 'clave';

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET); 
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(403).json({ error: 'Token no válido.' });
    }
}

module.exports = {
    authenticateToken
};
