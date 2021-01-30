const { Router } = require('express');
const addqController = require('../controllers/addqController');
const multer = require('multer');
const upload = multer();

const router = Router();
router.post('/addq',upload.none(), addqController.addq_post);
module.exports = router;