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

const app = express();

//Admin Bro adapter
AdminBro.registerAdapter(AdminBroMongoose);
app.use(express.json());
app.use(cookieParser());
app.set('view engine','ejs');
app.use(express.static('public'));

const dbURI = 'mongodb+srv://abhishek:test1234@cluster0.j4tsp.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
.then((result) => app.listen(3000)).
catch((err) => console.log(err));

const AdminBroOptions = {
    rootPath: '/admin',
   resources: [user,topic,question,company,interview]
}
const adminBro = new AdminBro(AdminBroOptions);
const router = AdminBroExpress.buildRouter(adminBro);

app.get('*',checkUser);
app.get('/',(req,res)=> res.render('home'));   
app.use(authRoutes);
app.use(requireAuth);
app.use(adminBro.options.rootPath,adminAuth, router);
app.use(mainroutes);
app.use(interviewroutes);
app.use(addqRoutes);
app.use(addeRoutes);
