const express = require("express");
const router = express.Router();
const db = require("../models");


// Create Workout
router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

// Get (view) the most recent Workout from db
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    .sort({ day: "asc"})
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});


// Update a workout with new exercises
router.put("/api/workouts/:id", ({ params, body }, res) => {
    db.Workout.findByIdAndUpdate(params.id,
       { $push: { exercises : body } },
       { new: true, runValidators: true } )
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

// Get (view) the duration of the last 7 days of workouts
router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
    ])
    .limit(7)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});



module.exports = router;