const express = require('express');
const router = express.Router();
const Booking = require('../models/bookingModel');
const sendReservationConfirmationEmail=require('../middleware/sendMail');


// Route pour créer une nouvelle réservation
router.post('/bookings', async (req, res) => {
    try {
        const { roomId, userId, startTime, endTime } = req.body;

        if (endTime <= startTime) {
            return res.status(400).json({ success: false, message: "End time must be greater than start time." });
        }

        // Vérifier si la salle de réunion est disponible pour la plage horaire spécifiée
        const existingBooking = await Booking.findOne({
            roomId: roomId,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
                { startTime: { $gte: startTime, $lte: endTime } }
            ]
        });

        // S'il y a une réservation existante pour la salle de réunion et la plage horaire spécifiée, renvoyer un message d'erreur
        if (existingBooking) {
            return res.status(401).json({status: false, message: "La salle de réunion est déjà réservée pour cette période." });
        }
        const newBooking = new Booking({ roomId, userId, startTime, endTime });
        const savedBooking = await newBooking.save();
      
        // const user = await User.findById(userId);
        //sendReservationConfirmationEmail(user.email)
        // sendMail(email, subject, txt);
      
      
        return res.status(201).json({status: true,savedBooking});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la création de la réservation" });
    }
});

// Route pour récupérer toutes les réservations
router.get('/bookings', async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.json( {success: true, message: "Réservations récupérées avec succès.", bookings});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la récupération des reservation" });
    }
});

// Route pour récupérer toutes les réservations
router.get('/bookings/:userID', async (req, res) => {
    try {
        const userID = req.params.userID;
        const userBookings = await Booking.find({userId: userID}).populate('roomId');
        res.status(201).json( {success: true, message: "Réservations récupérées avec succès.", userBookings});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Erreur lors de la récupération des reservation" });
    }
});

// Route pour mettre à jour une réservation existante
router.put('/bookings/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;
        const { startTime, endTime, roomId } = req.body;
//startTime < endTime
        if (endTime <= startTime) {
            return res.status(400).json({ success: false, message: "End time must be greater than start time." });
        }


        const existingBooking = await Booking.findOne({
            roomId: roomId,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
                { startTime: { $gte: startTime, $lte: endTime } }
            ]
        });

        // S'il y a une réservation existante pour la salle de réunion et la plage horaire spécifiée, renvoyer un message d'erreur
        if (existingBooking) {
            return res.status(401).json({status: false, message: "La salle de réunion est déjà réservée pour cette période." });
        };

        const updatedBooking = await Booking.findByIdAndUpdate(bookingId,
            {  ...req.body },
            { new: true }
        );

        if (!updatedBooking) {
            return res.status(404).json({  success: false, message: "Réservation introuvable."  });
        }

       return res.status(200).json({ success: true, message: "Réservation mise à jour avec succès.", booking: updatedBooking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Une erreur est survenue lors de la mise à jour de la réservation." });
    }
});

// Route pour supprimer une réservation existante
router.delete('/bookings/:id', async (req, res) => {
    try {
        const bookingId = req.params.id;
        await Booking.findByIdAndDelete(bookingId);
        return res.status(201).json({ success: true, message: "Réservation supprimée avec succès." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Une erreur est survenue lors de la suppression de la réservation." });
    }
});

// Route pour supprimer toutes les réservations existantes
router.delete('/bookings', async (req, res) => {
    try {
        await Booking.deleteMany({}); // Supprimer toutes les réservations
        return res.status(200).json({ success: true, message: "Toutes les réservations ont été supprimées avec succès." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Une erreur est survenue lors de la suppression des réservations." });
    }
});


// Route pour verifiee date
router.get('/bookings/:roomID', async (req, res) => {
    try {
        const roomID = req.params.roomID;
        const { startTime, endTime } = req.body;

        // Vérifier si la salle de réunion est disponible pour la plage horaire spécifiée
        const existingBooking = await Booking.findOne({
            roomId: roomID,
            $or: [
                { startTime: { $lt: endTime }, endTime: { $gt: startTime } },
                { startTime: { $gte: startTime, $lte: endTime } }
            ]
        });

        if (existingBooking) {
            return res.status(409).json({ 
                status: false,
                message: "La salle de réunion est déjà réservée pour cette période." 
            });
        } else {
            return res.status(200).json({ 
                status: true,
                message: "La salle est disponible." 
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Une erreur est survenue lors de la vérification de la disponibilité de la salle de réunion." });
    }
});


module.exports = router;