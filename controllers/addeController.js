const companyModel = require("../models/companies.js");
const interview = require("../models/interviews.js");
const path = require('path');
const fs = require('fs');
var multer = require('multer');

// We will define the storage path for the image we are uploading. 
// Here, we are using the middleware Multer to upload the photo to the server in a folder called `uploads` so we can process it.
const Storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req,file,cb)=>{
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

module.exports.upload = multer({storage:Storage});

module.exports.adde_post = async (req,res)=>{
    const formData = req.body;
    const name = formData.name;
    const branch = formData.branch;
    const year = formData.year;
    const company = formData.company;
    const experience = formData.experience;
    try{
        // Handle the POST request that processes the form data submitted by the user from our HTML UI. 
        //  This request will have the new images being uploaded.
        l3 = await companyModel.findOne({name:company});
        var Exp = new interview({
            name : name,
            branch : branch,
            year : year,
            company : l3._id,
            experience : experience,
            img:{
                data: fs.readFileSync(req.file.path),
                contentType:'image/png'
            }
        });
        Exp.save();
        res.redirect('/company');
        
    }
    catch(err){ 
        console.log(err);
    }

    try{
        fs.unlinkSync(req.file.path);
    }catch(err){
        console.log(err);
    }
}

