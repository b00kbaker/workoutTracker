const router = require("express").Router();

const Workout = require("../models/workout.js");

router.post("api/workouts", ({ body }, res) => {
    Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

router.get("api/workouts", (req, res) => {
    Workout.find()
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});




// "api/workouts"
// GET
// POST
// PUT
// DELETE

router.put("api/workouts/id:", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(params.id,
       { $push: { exercises : body } },
       { new: true, runValidators: true } )
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.json(err);
    });
});

// "api/workouts/id:"
// GET
// POST

router.get("api/workouts/range", (req, res) => {
    Workout.find({})
    .limit(7)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});


// range?