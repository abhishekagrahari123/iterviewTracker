const jwt = require('jsonwebtoken');
const User = require('../models/User');
// const admins = require('/adminList.js');
const {admins} = require('./adminList');
//this function runs when user is trying to access routes which require authentication.
//if user is authenticated it calls next else redirect to login page
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
  
    //if token is present with correct value the user is authorized 
    //otherwise redirected to login page
    if (token) {
      jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.redirect('/login');
        } else {
         // console.log(decodedToken);
          next();
        }
      });
    } else {
      res.redirect('/login');
    }
  };

//this tries to insert user document stored in mongoDB to the views.
// If user is not authenticated then it the user variable to null. 
const checkUser = (req,res,next)=>{
    const token  = req.cookies.jwt;
    if(token){
        jwt.verify(token,'net ninja secret',async (err,decodedToken)=>{
            if(err){
                res.locals.user = null;
                next();
            }else{
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                res.locals.isAdmin = admins.includes(user.email);
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
}


//this funciton runs when user tries to access admin routes.
//it finds user from the token and checks whether user is admin or not 
//if he is not admin sends You are not admin message.
const adminAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    jwt.verify(token, 'net ninja secret', async(err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        let user = await User.findById(decodedToken.id);
        var isAdmin = admins.includes(user.email);
        res.locals.isAdmin = isAdmin;
        if(isAdmin){
          next();
        }
        else{
          res.send('You are not admin :(');
        }
      }
    });
  };
  

module.exports = { requireAuth, checkUser, adminAuth };