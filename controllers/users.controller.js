const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { usersModel } = require('../models/users.model');

const JWT_SECRET = 'clave';

async function signup(req, res) {
    try {
        const { email, username, password, birthdate, gender } = req.body;

        if (!email || !username || !password || !birthdate || !gender) {
            return res.status(400).json({ error: 'Todos los campos son requeridos.' });
        }

         const existingEmail = await usersModel.findOne({ email });
         if (existingEmail) {
             return res.status(400).json({ error: 'El email ya está registrado.' });
         }
 
         const existingUsername = await usersModel.findOne({ username });
         if (existingUsername) {
             return res.status(400).json({ error: 'El nombre de usuario ya está en uso.' });
         }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new usersModel({
            email,
            username,
            password: hashedPassword,
            birthdate,
            gender
        });

        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente.' });

    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor.' });
    }
}

async function login(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Nombre de usuario y contraseña son requeridos.' });
        }

        const user = await usersModel.findOne({ username });

        if (!user || user.is_deleted) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas.' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' } 
        );

        res.status(200).json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor.' });
    }
}

async function updateUser(req, res) {
    try {
        const { userId } = req.body;
        const { email, username, birthdate, gender, bio, profile_picture } = req.body;

        const updatedUser = await usersModel.findByIdAndUpdate(
            userId,
            { email, username, birthdate, gender, bio, profile_picture },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        res.status(200).json({ message: 'Usuario actualizado exitosamente.', user: updatedUser });

    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor.' });
    }
}

async function deleteUser(req, res) {
    try {
        const { userId } = req.body;

        const deletedUser = await usersModel.findByIdAndUpdate(
            userId,
            { is_deleted: true },
            { new: true }
        );

        if (!deletedUser) {
            return res.status(404).json({ error: 'Usuario no encontrado.' });
        }
        res.status(200).json({ message: 'Usuario eliminado.', user: deletedUser });

    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor.' });
    }
}

module.exports = { 
    signup,
    login,
    updateUser,
    deleteUser
};

