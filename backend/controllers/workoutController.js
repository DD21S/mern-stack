const mongoose = require("mongoose")
const Workout = require("./../models/workoutModel")

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

// get a single workout
const getWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout."})
    }

    const workout = await Workout.findById(id)

    if (!workout) {
        return res.status(404).json({error: "No such workout."})
    }

    res.status(200).json(workout)
}

// create a new workout
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body

    try {
        const workout = await Workout.create({ title, reps, load })
        res.status(201).json(workout) 
    } catch(error) {
        res.status(422).json({error: error.message})
    }
}

// update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout."})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, { ...req.body })

    if (!workout) {
        return res.status(400).json({error: "No such workout."})
    }

    res.status(200).json(workout)
}


// delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such workout."})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout) {
        return res.status(400).json({error: "No such workout."})
    }

    res.status(303).json({})
}

module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout
}