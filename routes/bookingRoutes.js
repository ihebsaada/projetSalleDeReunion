const express = require('express');
const router = express.Router();
const Booking = require('../routes/bookingRoutes')

// Route pour créer une nouvelle réservation
router.post('/bookings', async (req, res) => {
    try {
        const { roomId, userId, startTime, endTime } = req.body;
        const newBooking = new Booking({ roomId, userId, startTime, endTime });
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de la réservation" });
    }
});

// Route pour récupérer toutes les réservations
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await bookings.find();
        res.json(bookings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la récupération des reservation" });
    }
});

// Route pour mettre à jour une réservation existante
router.put('/bookings/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;

        const { roomId, userId, startTime, endTime } = req.body;

        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, 
            { roomId, userId, startTime, endTime },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: "Réservation introuvable" });
        }

        res.json(updatedBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la mise à jour de la réservation" });
    }
});

// Route pour supprimer une réservation existante
router.delete('/bookings/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;
        await Booking.findByIdAndDelete(bookingId);
        res.json({ message: "Reservation supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la suppression de la reservation" });
    }
});

module.exports = router;