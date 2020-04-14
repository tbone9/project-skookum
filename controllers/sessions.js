const Session = require('../models/session');

const createSession = async (req, res) => {
    try {
        const session = await Session.create(req.body);
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
        await Session.findByIdAndRemove(req.params.id);
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