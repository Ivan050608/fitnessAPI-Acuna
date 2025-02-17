const Workout = require("../models/Workout");

module.exports.addWorkout = (req, res) => {

  let newWorkout = new Workout({
    name: req.body.name,
    duration: req.body.duration,
  });

  return newWorkout.save()
    .then((workout) => res.status(201).send({ workout }))
    .catch((err) => res.status(500).send({ error: "Error in Save", details: err }));
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

  let updatedWorkout = {
    name: req.body.name,
    duration: req.body.duration,
    status: req.body.status
  };

  return Workout.findByIdAndUpdate(req.params.workoutId, updatedWorkout, { new: true })
    .then((workout) => res.status(200).send({
      message: 'Workout updated successfully',
      updatedWorkout: workout
    }))
    .catch(err => res.status(500).send({ error: "Error in Saving", details: err }));
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
