const express = require('express');
const router2 = express();
const f2 = require('../controllers/interviewcontroller.js');

router2.get('/company' , f2.viewcompany);
router2.get('/company/:id2' , f2.viewexperience);

module.exports = router2 ;
