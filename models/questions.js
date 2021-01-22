const mongoose = require('mongoose');
const topics = require('./topics.js');
questionSchema = new mongoose.Schema({
    name:{type:String},

    topic:{type:mongoose.Schema.Types.ObjectId,ref:'Topics'},
    
    link:{type:String},

    approv:  {
        type: Boolean,
        default: false
    }
});

const question = mongoose.model('Question',questionSchema)
module.exports= question;
