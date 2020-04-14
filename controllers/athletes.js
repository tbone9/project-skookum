const Athlete = require('../models/athlete');
const request = require('request');

const createAthlete = async (req, res) => {
    try {
        const athlete = await Athlete.create(req.body);
        return res.json(athlete);
    } catch (error) {
        return res.sendStatus(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

const getAllAthletes = async (req, res) => {
    try {
        const athletes = await Athlete.find();
        return res.json({
            success: true,
            count: athletes.length,
            data: athletes
        })
    } catch (error) {
        return res.sendStatus(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

const getOneAthlete = async (req, res) => {
    try {
        const athlete = await Athlete.findById(req.params.id).populate('sessions');
        return res.json({
            success: true,
            data: athlete
        })
    } catch (error) {
        return res.sendStatus(500).json({
            success: false,
            error: 'Server Error',
            msg: error
        })
    }
}

const updateAthlete = async (req, res) => {
    try {
        const athlete = await Athlete.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false });
        return res.json({
            success: true,
            data: athlete
        });
    } catch (error) {
        return res.sendStatus(500).json({
            success: false,
            error: 'Server Error',
            msg: error
        })
    }
}

const deleteAthlete = async (req, res) => {
    try {
        await Athlete.findByIdAndRemove(req.params.id);
        return res.json({
            success: true,
            data: {}
        });
    } catch (error) {
        return res.sendStatus(500).json({
            success: false,
            error: 'Server Error',
            msg: error
        })
    }
}


module.exports = {
    createAthlete,
    getAllAthletes,
    getOneAthlete,
    deleteAthlete,
    updateAthlete,

};