const { Router } = require('express');
const addeController = require('../controllers/addeController');

const router = Router();
//Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
// It is written on top of busboy for maximum efficiency. Multer adds a body object and a file or files object to the request object. 
// The bodyobject contains the values of the text fields of the form, the file or files object contains the files uploaded via the form.
router.post('/adde',addeController.upload.single('uploaded_image'),addeController.adde_post);
module.exports = router;