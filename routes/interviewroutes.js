const express = require('express');
const router2 = express();
const f2 = require('../controllers/interviewController.js');

router2.get('/company' , f2.viewcompany);
router2.get('/company/:id2' , f2.viewexperience);
router2.get('/company/experience/:id3' , f2.experiencePage);
module.exports = router2 ;
