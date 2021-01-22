const companyModel = require("../models/companies.js");
const interview = require("../models/interviews.js");

module.exports.adde_post = async (req,res)=>{
    const {name, company, experience} = req.body;
    //console.log(topic);
    try{
        l3 = await companyModel.findOne({name:company});
        const newe = await interview.create({name : name, company : l3._id, experience : experience});
        res.status(201).json({newe:newe._id});
    }
    catch(err){ 
        console.log(err);
    }
}

