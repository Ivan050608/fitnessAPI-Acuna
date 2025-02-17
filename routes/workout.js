const express = require("express");
const workoutController = require("../controllers/workout");
const { verify } = require("../auth");
const router = express.Router();

router.post("/", verify, workoutController.addWorkout);
router.get("/all", verify, workoutController.getMyWorkouts); 
router.get("/:id", verify, workoutController.getWorkoutById); 
router.put("/:id", verify, workoutController.updateWorkout); 
router.delete("/:id", verify, workoutController.deleteWorkout);
router.put("/completeWorkoutStatus/:id", verify, workoutController.completeWorkoutStatus); 

module.exports = router;

