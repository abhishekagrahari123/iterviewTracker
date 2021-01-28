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

const experiencePage = async (req,res) => 
{
  const id3= req.params.id3;
  l3 = await interview.find({_id:id3});
  res.locals.experiencer = l3[0];
  res.render('interview/experiencer.ejs');
}

module.exports = {viewcompany,viewexperience,experiencePage};
