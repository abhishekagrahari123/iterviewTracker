const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const {requireAuth, checkUser, adminAuth} = require('./middleware/authMiddleware');
const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroMongoose = require('@admin-bro/mongoose');
const user = require('./models/User.js');
const topic = require('./models/topics.js');
const question =require('./models/questions.js')
const company = require('./models/companies.js');
const interview =require('./models/interviews.js')
const mainroutes = require('./routes/mainroutes.js');
const interviewroutes = require('./routes/interviewroutes.js');
const addqRoutes = require('./routes/addqRoutes');
const addeRoutes = require('./routes/addeRoutes');

//creating a express application
//this object, which is traditionally named app, has methods for routing HTTP requests,
// configuring middleware, rendering HTML views, registering a template engine, 
//and modifying application settings that control how the application behaves 
//(e.g. the environment mode, whether route definitions are case sensitive, etc.)
const app = express();

//Admin Bro adapter
AdminBro.registerAdapter(AdminBroMongoose);
app.use(express.json());
app.use(cookieParser());
app.set('view engine','ejs');

// it makes static files like css public
app.use(express.static('public'));

//connecting to database and listening to port 3000
const dbURI = 'mongodb+srv://abhishek:test1234@cluster0.j4tsp.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then((result) => app.listen(3000)).
catch((err) => console.log(err));

//setting up AdminBro
const AdminBroOptions = {
    rootPath: '/admin',
   resources: [user,topic,question,company,interview]
}
const adminBro = new AdminBro(AdminBroOptions);
const router = AdminBroExpress.buildRouter(adminBro);

//injecting user document to all routes. It is null for unauthenticated users.
app.get('*',checkUser);

//for unauthorised users
app.get('/',(req,res)=> res.render('home'));   
app.use(authRoutes);

//for authorization of users
app.use(requireAuth);

//all further routes will be accessed only by logged in users
app.use(adminBro.options.rootPath,adminAuth, router);
app.use(mainroutes);
app.use(interviewroutes);
app.use(addqRoutes);
app.use(addeRoutes);
