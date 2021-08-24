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
    // So for storing an image in MongoDB, we need to create a schema with mongoose. 
    // For that create the file `model.js` file and define the schema. 
    // The important point here is that our data type for the image is a Buffer which allows us to store our image as data in the form of arrays.
    img:{ data : Buffer, contentType: String}
});

const interview = mongoose.model('Interview',interviewSchema)
module.exports= interview;
