const company = require("../models/companies.js");
const interview = require("../models/interviews.js");

const viewcompany = async (req,res) =>
{
  const result2 = await company.find();
  res.locals.rest2 = result2;
  res.render('interview/company.ejs',{b2:result2});
}

const viewexperience = async (req,res) => 
{
  const id2= req.params.id2;
  l2 = await interview.find({company:id2});
  const result2 = await company.find();
  res.locals.rest2 = result2;
  res.render('interview/experience.ejs' , {list2:l2});
}

module.exports = {viewcompany,viewexperience};
