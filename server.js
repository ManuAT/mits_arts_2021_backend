// set up ======================================================================
var express = require('express');
var app = express(); 						// create our app w/ express
var mongoose = require('mongoose'); 				// mongoose for mongodb
var port = process.env.PORT || 8080; 				// set the port
var database = require('./config/database'); 			// load the database config
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
// configuration ===============================================================

mongoose.connect('mongodb+srv://manu:cat007@@cluster0-axhr4.mongodb.net/', {dbName: 'foodapp'});



mongoose.connect(database.remoteUrl,(err)=>{
    console.log("err",err)
}); 	// Connect to local MongoDB instance. A remoteUrl is also available (modulus.io)

//********to view builded data  

app.use(cors());
app.use(express.static('app/dist/billingApp'));

app.get('/',(req,res)=>{
res.sendFile('app/dist/billingApp');
})

// set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended': 'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);