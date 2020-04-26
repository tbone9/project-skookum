const express = require('express');
const router = express.Router();
const athletesCtrl = require('../../controllers/athletes');

/*---------- Public Routes ----------*/
router.get('/all', athletesCtrl.getAllAthletes);
router.get('/:id', athletesCtrl.getOneAthlete);
// router.put('/image', athletesCtrl.addImage);

/*---------- Protected Routes ----------*/
//need this bit just below for the checkAuth to work!!!
router.use(require('../../config/auth'));

router.get('/check/checkAuth', checkAuth, athletesCtrl.checkAuth);
router.post('/create', checkAuth, athletesCtrl.createAthlete);
router.put('/:id', checkAuth, athletesCtrl.updateAthlete);
router.delete('/:id', checkAuth, athletesCtrl.deleteAthlete);
router.get(`/query/:firstName`, checkAuth, athletesCtrl.getAthleteQuery);

/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}

module.exports = router;