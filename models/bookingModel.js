const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    room: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Room', 
        required: true 
    },
    startTime: {
         type: Date, 
         required: true 
        },
    endTime: { 
        type: Date, 
        required: true 
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;