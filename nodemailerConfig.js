const nodemailer = require('nodemailer');

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'votre_adresse_email@gmail.com',
        pass: 'votre_mot_de_passe'
    }
});

module.exports = transporter;
