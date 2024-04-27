const nodemailer = require('nodemailer');
const env = require('dotenv')


// Configurer le transporteur de messagerie
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'saadaiheb.clubiste@gmail.com',
        pass: process.env.pwdG
    }
});

// Fonction pour envoyer un e-mail de notification de réservation
const sendReservationEmail = async (userEmail, roomName, startTime, endTime) => {
    const mailOptions = {
        from: 'votre-email@gmail.com',
        to: userEmail,
        subject: 'Confirmation de réservation de salle',
        html: `<p>Votre réservation pour la salle ${roomName} de ${startTime} à ${endTime} a été confirmée.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('E-mail de confirmation de réservation envoyé.');
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail de confirmation de réservation:', error);
    }
};

// Fonction pour envoyer un e-mail de notification d'annulation de réservation
const sendCancellationEmail = async (userEmail, roomName, startTime, endTime) => {
    const mailOptions = {
        from: 'votre-email@gmail.com',
        to: userEmail,
        subject: 'Annulation de réservation de salle',
        html: `<p>Votre réservation pour la salle ${roomName} de ${startTime} à ${endTime} a été annulée.</p>`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('E-mail d\'annulation de réservation envoyé.');
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail d\'annulation de réservation:', error);
    }
};