const companyModel = require("../models/companies.js");
const interview = require("../models/interviews.js");

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
        res.status(201).json({newe:newe._id});
    }
    catch(err){ 
        console.log(err);
    }
}

