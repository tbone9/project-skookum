const Athlete = require('../models/athlete');
const Session = require('../models/session');
// const multer = require('multer');
// const upload = multer({ dest: 'uploads/' });

// const addImage = async (req, res) => {
//     try {
//         const uploadTask = storage.ref
//     } catch (error) {
//         return res.sendStatus(500).json({
//             success: false,
//             error: 'Server Error'
//         })
//     }
// }

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

const getAthleteQuery = async (req, res) => {
    console.log(req.params, 'PARAMS')
    try {
        const athletes = await Athlete.find({ firstName: req.params.firstName });
        return res.json({ data: athletes })
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
        const athlete = await Athlete.findById(req.params.id);
        console.log(athlete)
        await Session.deleteMany(
            {
                _id: {
                    $in: athlete.sessions
                }
            }
        )
        await athlete.remove();
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
    getAthleteQuery,
    // addImage
};