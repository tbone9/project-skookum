const express = require('express');
const router = express.Router();
const sessionsCtrl = require('../../controllers/sessions');

/*---------- Public Routes ----------*/
router.post('/create', sessionsCtrl.createSession);
router.get('/all', sessionsCtrl.getAllSessions);
router.get('/:id', sessionsCtrl.getOneSession);
router.put('/:id', sessionsCtrl.updateSession);
router.delete('/:id', sessionsCtrl.deleteSession);

/*---------- Protected Routes ----------*/




module.exports = router;