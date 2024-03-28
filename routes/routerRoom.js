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
// Route pour créer une nouvelle salle de réunion
router.post('/rooms', async (req, res) => {
    try {
        const { 
            nom, 
            capacity, 
            equipements, 
            disponibility 
        } = req.body;
        const newRoom = new Room({ nom, capacity, equipements, disponibility });
        const savedRoom = await newRoom.save();
        console.log(savedRoom)
        res.status(201).json(savedRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de la salle de réunion" });
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
            disponibility
         } = req.body;
        const updatedRoom = await Room.findByIdAndUpdate(roomId, { nom, capacity, equipements, disponibility }, { new: true });
        res.json(updatedRoom);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de la salle de réunion" });
    }
});

// Route pour supprimer une salle de réunion existante
router.delete('/rooms/:id', async (req, res) => {
    try {
        const roomId = req.params.id;
        await Room.findByIdAndDelete(roomId);
        res.json({ message: "Salle de réunion supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression de la salle de réunion" });
    }
});



module.exports = router;