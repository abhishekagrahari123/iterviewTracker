const { Router } = require('express');
const addqController = require('../controllers/addqController');

const router = Router();
router.post('/addq',addqController.addq_post);
module.exports = router;