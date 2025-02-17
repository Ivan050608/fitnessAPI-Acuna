const Workout = require("../models/Workout");

module.exports.addWorkout = (req, res) => {
  let newWorkout = new Workout({
    name: req.body.name, 
    duration: req.body.duration, 
    status: req.body.status, 
  });

  newWorkout
    .save()
    .then((savedWorkout) => res.status(201).send(savedWorkout))
    .catch((saveErr) => {
      console.error("Error in saving the workout: ", saveErr);
      return res.status(500).send({ error: "Failed to save the workout" });
    });
};

module.exports.getMyWorkouts = (req, res) => {
  Workout.find({})
    .then((workouts) => {
      if (workouts.length > 0) {
        return res.status(200).send({ workouts });
      } else {
        return res.status(200).send({ message: "No workouts found." });
      }
    })
    .catch((err) => {
      console.error("Error finding workouts: ", err);
      return res.status(500).send({ error: "Error finding workouts." });
    });
};

module.exports.getWorkoutById = (req, res) => {
  Workout.findById(req.params.id)
    .then((foundWorkout) => {
      if (!foundWorkout) {
        return res.status(404).send({ error: "Workout not found" });
      }
      return res.status(200).send({ foundWorkout });
    })
    .catch((err) => {
      console.error("Error in fetching the workout: ", err);
      return res.status(500).send({ error: "Failed to fetch workout" });
    });
};

module.exports.updateWorkout = (req, res) => {
  let workoutUpdates = {
    name: req.body.name,
    duration: req.body.duration,
    status: req.body.status,
    isActive: req.body.isActive
  };

  return Workout.findByIdAndUpdate(req.params.id, workoutUpdates, { new: true })
    .then((updatedWorkout) => {
      if (!updatedWorkout) {
        return res.status(404).send({ error: "Workout not found" });
      }
      return res.status(200).send({
        message: "Workout updated successfully",
        updatedWorkout: updatedWorkout
      });
    })
    .catch((err) => {
      console.error("Error in updating workout: ", err);
      return res.status(500).send({ error: "Error in updating workout." });
    });
};

module.exports.deleteWorkout = (req, res) => {
  return Workout.findByIdAndDelete(req.params.id)
    .then((deletedWorkout) => {
      if (!deletedWorkout) {
        return res.status(404).send({ error: "Workout not found" });
      }
      return res.status(200).send({ message: "Workout deleted successfully" });
    })
    .catch((err) => {
      console.error("Error in deleting workout: ", err);
      return res.status(500).send({ error: "Error in deleting workout." });
    });
};

module.exports.completeWorkoutStatus = (req, res) => {
  let updateActiveField = {
    isActive: false, // Mark the workout as completed
    status: "completed" // Update status to 'completed'
  };

  return Workout.findByIdAndUpdate(req.params.id, updateActiveField, { new: true }) // Ensure `new: true` to return the updated workout
    .then(workout => {
      if (workout) {
        if (!workout.isActive) {
          return res.status(200).send({
            message: 'Workout already completed',
            workoutDetails: workout
          });
        }
        return res.status(200).send({
          success: true,
          message: 'Workout completed successfully',
          workoutDetails: workout
        });
      } else {
        return res.status(404).send({error: 'Workout not found'});
      }
    })
    .catch(error => {
      console.error("Error in completing workout: ", error);
      return res.status(500).send({error: 'Error in completing workout.'});
    });
};
