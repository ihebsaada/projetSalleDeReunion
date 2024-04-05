const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    roomId: { 
        type: String, 
        required: true, 
        unique: true 
    },
    nom: { 
        type: String, 
        required: true 
    },
    capacity: { 
        type: Number, required: true 
    },
    equipements: [String],
    disponibility: [{ type: String }]


});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;