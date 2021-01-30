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

interviewSchema.virtual('imgSrc').get(function(){
    if(this.img.data != null && this.img.contentType != null){
        return `data:${this.img.contentType};
        charset = utf-8;
        base64,${this.img.data.toString('base64')}`
    }
})

const interview = mongoose.model('Interview',interviewSchema)
module.exports= interview;
