const express = require('express');
const router = express.Router();
const Athlete = require('../../models/athlete');
const athletesCtrl = require('../../controllers/athletes');

/*---------- Public Routes ----------*/
router.post('/create', athletesCtrl.createAthlete);
router.get('/all', athletesCtrl.getAllAthletes);
router.get('/:id', athletesCtrl.getOneAthlete);
router.put('/:id', athletesCtrl.updateAthlete);
router.delete('/:id', athletesCtrl.deleteAthlete);

/*---------- Protected Routes ----------*/




module.exports = router;