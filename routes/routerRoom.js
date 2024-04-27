const express = require('express');
const router = express.Router();
const Room = require('../models/roomModel');

// Définir la route pour récupérer toutes les salles de réunion
router.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json({ success: true, rooms });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur lors de la récupération des salles de réunion" });
    }
});
// Route pour créer une nouvelle salle de réunion
router.post('/rooms', async (req, res) => {
    try {
        const {
            nom,
            capacity,
            equipements,
            image
        } = req.body;
        const newRoom = new Room({ nom, capacity, equipements, image });
        const savedRoom = await newRoom.save();
        console.log(savedRoom)
        res.status(201).json({ success: true, message: "Salle de réunion créée avec succès.", room: savedRoom });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Erreur lors de la création de la salle de réunion." });
    }
});

// Route pour mettre à jour une salle de réunion existante
router.put('/rooms/:id', async (req, res) => {
    try {
        const roomId = req.params.id;
        const {
            nom,
            capacity,
            equipements,
            image
        } = req.body;
        const updatedRoom = await Room.findByIdAndUpdate(roomId, { nom, capacity, equipements, image }, { new: true });
        res.status(200).json({ success: true, message: "Salle de réunion mise à jour avec succès.", room: updatedRoom });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Erreur lors de la mise à jour de la salle de réunion." });
    }
});

// Route pour supprimer une salle de réunion existante
router.delete('/rooms/:id', async (req, res) => {
    try {
        const roomId = req.params.id;
        await Room.findByIdAndDelete(roomId);
        res.status(204).json({ success: true, message: "Salle de réunion supprimée avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Erreur lors de la suppression de la salle de réunion." });
    }
});



module.exports = router;