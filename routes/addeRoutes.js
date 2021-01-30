const { Router } = require('express');
const addeController = require('../controllers/addeController');

const router = Router();
router.post('/adde',addeController.upload.single('uploaded_image'),addeController.adde_post);
module.exports = router;