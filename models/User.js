const mongoose = require('mongoose');

//we import the isEmail function from the validator package
const { isEmail } = require('validator');

//the package bcrypt is required for hashing the passwords before they are saved to the database.
const bcrypt = require('bcrypt');

//userSchema object defines the structure of the user documents
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: [true,'Please enter an email'],
        unique:true, 
        lowercase: true,
        validate:[isEmail, 'Please enter a valid email']
    },
    password:{
        type: String,
        required: [true,'Please enter a password'],
        minLength: [6, 'Minimum password length is 6 characters']
    }
});

// fire a function before doc saved to db using mongoose hook(pre)
//prior to saving the doc, we hash the passwords
userSchema.pre('save',async function(next){
    //salt is the extra random characters that get added to the password
    const salt = await bcrypt.genSalt(); 
    // using the 'this' keyword we get hold of the doc which is about to be saved
    this.password = await bcrypt.hash(this.password,salt);  
    // need to call the next middleware otherwise the website would hang and not proceed further
    next();
})

//static method to login user used in login_post method in authController
userSchema.statics.login = async function(email,password){

    // 'this' refers to the User model 
    const user = await this.findOne({email});
    if(user){
        // compares the password after hashing with the one in the db
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

//creating a user( this name should be the singular form of the database collection name) model using the above schema
const User = mongoose.model('user',userSchema);

module.exports = User;