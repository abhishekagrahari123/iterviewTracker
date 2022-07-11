const User = require("../models/User");
const jwt = require('jsonwebtoken');

//              ---------------------------         HELPER FUNCTIONs      ------------------------------

//handle errors
const handleErrors = (err) => {
    console.log ( err.message , err.code );
    let errors = { email :'', password :'' };

    //incorrect emails
    if(err.message==='incorrect email'){
        errors.email = 'That email is not registered';
    }

    //incorrect password
    if(err.message==='incorrect password'){
        errors.password = 'That password is incorrect';
    }

    //duplicate email errors
    if(err.code===11000){ 
        //we use the error code that  is generated if  user tries to register with an email that already exists
        errors.email = 'That email is already registered';
        return errors;
    }


    //validation errors when new users are created
    if (err.message.includes('user validation failed')){
        Object.values(err.errors).forEach( ({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
}

// create json web token
const maxAge = 3*24*60*60;
const createToken = (id)=>{
    return jwt.sign({id},'net ninja secret',{  //	Convenient option for setting the expiry time relative to the current time in seconds.
        expiresIn:maxAge
    });//whereas cookie expects time in millisec
    //the jwt will automatically be destroyed after maxage time
    //SYNTAX jwt.sign(payload, secretOrPrivateKey, [options, callback])
}

//              ---------------------------         MAIN FUNCTIONs      ------------------------------

module.exports.signup_get = (req,res)=>{
    res.render('signup');
}

module.exports.login_get = (req,res)=>{
    res.render('login');
}

module.exports.signup_post = async (req,res)=>{
    const {email, password} = req.body;
    try{
        //once the user is successfully created we create a jwt, that is sent to the client in a cookie and tells it that the user is logged in
        const user = await User.create({email,password});
        // putting the created jwt in a cookie and sending it back as part of the res
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge*1000}); 
        
        //httpOnly Flags the cookie to be accessible only by the web server.
        res.status(201).json({user:user._id});
        // this json data is accessed in signup.ejs as res.json();
    }
    catch(err){
      const errors = handleErrors(err);
      res.status(400).json({errors});
      // this json data is accessed in signup.ejs as res.json();
    }
}

module.exports.login_post = async(req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly:true, maxAge: maxAge*1000});
        res.status(201).json({user:user._id});
        // this json data is accessed in signup.ejs as res.json();
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
        // this json data is accessed in signup.ejs as res.json();
    }
}

module.exports.logout_get = (req,res) => {
    res.cookie('jwt','',{maxAge: 1}); //we replace the jwt with empty string and maxAge = 1ms as soon as logout function is fired
    res.redirect('/');
}
