const { Router } = require('express');
const addeController = require('../controllers/addeController');
const multer = require('multer');
const upload = multer();

const router = Router();
router.post('/adde',upload.none(),addeController.adde_post);
module.exports = router;