const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Workout name is required']
  },
  duration: {
    type: Number, // in minutes or seconds
    required: [true, 'Workout duration is required']
  },
  dateAdded: {
    type: Date,
    default: Date.now // Timestamp when the workout is added
  },
  status: {
    type: String,
    default: 'Pending'
  },
  isActive: {
    type: Boolean,
    default: true // Indicates if the workout is currently active
  }
});

module.exports = mongoose.model('Workout', workoutSchema);
