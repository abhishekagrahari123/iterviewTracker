const mongoose= require('mongoose');
const companySchema= new mongoose.Schema({name:{type:String}});
const companies = mongoose.model('Company',companySchema);
module.exports = companies;