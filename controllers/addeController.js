const companyModel = require("../models/companies.js");
const interview = require("../models/interviews.js");
const path = require('path');
var multer = require('multer');

//set the storage engine
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req,file,cb)=>{
        cb(null, file.filename + '-' + Date.now() + '.jpg');
    }
});

module.exports.upload = multer({storage:storage});


module.exports.adde_post = async (req,res)=>{

    const formData = req.body;
    const name = formData.name;
    const branch = formData.branch;
    const year = formData.year;
    const company = formData.company;
    const experience = formData.experience;
    try{
        l3 = await companyModel.findOne({name:company});
        const newe = await interview.create({name : name, branch : branch, year : year, company : l3._id, experience : experience});
        res.redirect('/company');
        
    }
    catch(err){ 
        console.log(err);
    }
}

