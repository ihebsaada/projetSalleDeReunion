const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel');

// Définir la route pour récupérer toutes les salles de réunion
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la récupération des salles de réunion" });
    }
});



module.exports = router;