const express = require('express');
const router = express.Router();
const sessionsCtrl = require('../../controllers/sessions');

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(require('../../config/auth'));
router.post('/create', checkAuth, sessionsCtrl.createSession);
router.get('/all', checkAuth, sessionsCtrl.getAllSessions);
router.get('/:id', checkAuth, sessionsCtrl.getOneSession);
router.put('/:id', checkAuth, sessionsCtrl.updateSession);
router.delete('/:id', checkAuth, sessionsCtrl.deleteSession);


function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}



module.exports = router;