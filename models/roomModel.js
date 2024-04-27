const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    nom: { 
        type: String, 
        required: true 
    },
    capacity: { 
        type: Number, 
        required: true 
    },
    equipements: { 
        type: Array, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    }

});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;