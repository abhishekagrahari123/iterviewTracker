const express = require('express');
const router = express();
const f1 = require('../controllers/maincontroller.js');

router.get('/topics' , f1.viewtopic);
router.get('/topics/:id' , f1.viewquestion);

module.exports = router;
