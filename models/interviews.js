const mongoose = require('mongoose');
const companies = require('./companies.js');
interviewSchema = new mongoose.Schema({
    name:{type:String},

    branch:{type:String},

    year:{type:String},

    company:{type:mongoose.Schema.Types.ObjectId,ref:'Company'},

    experience:{type:String},

    approv:  {
        type: Boolean,
        default: false
    },

    img:{ data : Buffer, contentType: String}
});

const interview = mongoose.model('Interview',interviewSchema)
module.exports= interview;
