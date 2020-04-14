const Session = require('../models/session');
const Athlete = require('../models/athlete');

const createSession = async (req, res) => {
    try {
        //create the session
        const session = await Session.create(req.body);
        // get one athlete and save the session to the athlete
        const athlete = await Athlete.findById(req.body.athleteId);
        console.log(athlete, 'athlete');
        await athlete.sessions.push(session._id);
        await athlete.save();

        return res.json(session);
    } catch (error) {
        return res.sendStatus(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

const getAllSessions = async (req, res) => {
    try {
        const sessions = await Session.find()
            .populate('createdBy');
        return res.json({
            success: true,
            count: sessions.length,
            data: sessions
        })
    } catch (error) {
        return res.sendStatus(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

const getOneSession = async (req, res) => {
    try {
        const session = await Session.findById(req.params.id).populate('createdBy');
        return res.json({
            success: true,
            data: session
        })
    } catch (error) {
        return res.sendStatus(500).json({
            success: false,
            error: 'Server Error',
            msg: error
        })
    }
}

const updateSession = async (req, res) => {
    try {
        const session = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: false });
        return res.json({
            success: true,
            data: session
        });
    } catch (error) {
        return res.sendStatus(500).json({
            success: false,
            error: 'Server Error',
            msg: error
        })
    }
}

const deleteSession = async (req, res) => {
    try {
        //Finds the session
        const session = await Session.findById(req.params.id);
        console.log(session, 'session');
        // Finds the athlete associated with the session and removes the session id from the sessions array (no need to save())
        await Athlete.update({ _id: session.athleteId }, { $pull: { sessions: req.params.id } });

        await session.remove();

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
    createSession,
    getAllSessions,
    getOneSession,
    deleteSession,
    updateSession,

};