const jwt = require('jsonwebtoken');
const {
    usersModel
} = require('../models/users.model');
const JWT_SECRET = 'clave';

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        //const decoded = jwt.verify(token.split(' ')[1], JWT_SECRET); 
        req.user = {
            id: user._id,
            username: user.username,
            role: user.role,
        }; 

        next();
    } catch (error) {
        res.status(403).json({ error: 'Token no válido.' });
    }
}

function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ error: 'No tienes permisos para realizar esta acción.' });
        }
        next();
    };
}

module.exports = {
    authenticateToken,
    authorizeRoles
};
