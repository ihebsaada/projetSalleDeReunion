const  express = require('express')
const app = express()
const env = require('dotenv')
const mongoose = require('mongoose')

//variable env
env.config();

//mongodb connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.wfh2zts.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  
    .then(() => console.log('Connecté à MongoDB'))
    .catch(err => console.error('Erreur de connexion à MongoDB', err));
  

app.use(express.json())
app.get('/', (req, res) => res.send('Serveur Express fonctionne correctement !'))
app.listen(process.env.port, () => console.log(`app listening on port ${process.env.port}!`))