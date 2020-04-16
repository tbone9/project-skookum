const express = require('express');
const router = express.Router();
const athletesCtrl = require('../../controllers/athletes');

/*---------- Public Routes ----------*/
router.get('/all', athletesCtrl.getAllAthletes);
router.get('/:id', athletesCtrl.getOneAthlete);

/*---------- Protected Routes ----------*/
//need this bit just below for the checkAuth to work!!!
router.use(require('../../config/auth'));

router.post('/create', checkAuth, athletesCtrl.createAthlete);
router.put('/:id', checkAuth, athletesCtrl.updateAthlete);
router.delete('/:id', checkAuth, athletesCtrl.deleteAthlete);

/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}

module.exports = router;