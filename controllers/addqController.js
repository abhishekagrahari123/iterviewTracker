const topicModel = require("../models/topics.js");
const question = require("../models/questions.js");

module.exports.addq_post = async (req,res)=>{
    const {name, topic, link} = req.body;
    //console.log(topic);
    try{
        l2 = await topicModel.findOne({name:topic});
        const newq = await question.create({name : name, topic : l2._id, link : link});
        res.status(201).json({newq:newq._id});
    }
    catch(err){ 
        console.log(err);
    }
}

