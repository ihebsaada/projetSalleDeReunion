const  express = require('express')
const app = express()
const cors = require('cors');
const env = require('dotenv')
const mongoose = require('mongoose')
const roomRoutes = require('./routes/routerRoom')
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes')
//variable env
env.config();


mongoose.connect(
    `mongodb+srv://hubo:hubo123@hubo.outjy7z.mongodb.net/?retryWrites=true&w=majority&appName=HUBO`, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB', err));

//middelware
app.use(express.json())
app.use(cors());
app.options("*", cors());
app.use('/api', authRoutes);
app.use('/api', userRoutes);
//app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Utiliser les routes pour les salles de réunion
app.use('/api', roomRoutes); // Toutes les routes pour les salles de réunion commencent par /api/rooms
app.use('/api', bookingRoutes); // Toutes les routes pour la reservt commencent par /api/booking








/*
// Fonction pour envoyer un e-mail de confirmation de réservation
function sendReservationConfirmationEmail(email, reservationDetails) {
  const mailOptions = {
      from: 'votre_adresse_email@gmail.com',
      to: email,
      subject: 'Confirmation de réservation de salle de réunion',
      text: `Bonjour,\n\nVotre réservation de salle de réunion a été confirmée. Voici les détails de votre réservation :\n\n${reservationDetails}\n\nCordialement,`
  };

  // Envoi de l'e-mail
  transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
          console.error('Erreur lors de l\'envoi de l\'e-mail de confirmation de réservation :', error);
      } else {
          console.log('E-mail de confirmation de réservation envoyé avec succès :', info.response);
      }
  });
}
*/












//serveur config
app.get('/', (req, res) => res.send('Serveur Express fonctionne correctement !'))
app.listen(process.env.port, () => console.log(`app listening on port ${process.env.port}!`))