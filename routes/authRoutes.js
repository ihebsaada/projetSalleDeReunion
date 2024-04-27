
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Route d'inscription
router.post('/register', async (req, res) => {
    try {
        // Récupérer les données de la requête
        const { name, email, password } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                status: false, 
                message: 'Cet utilisateur existe déjà.' 
            });
        }

        // Hacher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ 
            status: true,
            message: 'Utilisateur créé avec succès.', 
            user: newUser 
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            status: false, 
            message: 'Erreur lors de la création de l\'utilisateur.' 
        });
    }
});

// Route de connexion
router.post('/login', async (req, res) => {
    try {
        // Récupérer les données de la requête
        const { email, password } = req.body;

        // Vérifier si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                status: false, 
                message: 'Utilisateur non trouvé.' 
            });
        }

        // Vérifier le mot de passe
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        // Générer le token JWT
        const token = jwt.sign({ userId: user._doc._id }, process.env.JWT_SECRET);

        res.json({ 
            token,
            user: user._doc,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erreur lors de la connexion.' });
    }
});

// Route de déconnexion


module.exports = router;