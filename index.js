require('express-async-errors');// it use for get exception , not to down service when exception // 
const winston = require('winston');
const error = require('./middleware/error');
const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require("mongoose");
const patients = require('./routes/patients');
const records = require('./routes/records');
const home = require('./routes/home');
var cors = require('cors')
const express = require('express');
const app = express();
const config = require('config');


//for sync ///
process.on('uncaughtException', (ex) => {
  console.log('Got an uncaught exception');//get console log for uncaught errors // 
});

//for async ///
process.on('unhandledRejection', (ex) => {
  console.log('Got an unhandled rejection');//get console log for unhandled rejection errors // 
});


//heroku config:set clinic_db=mongodb+srv://dbUserClinic:shaw2115@cluster0-4xssw.azure.mongodb.net/test
// set heroku environment variables for connection string // 

//const db = "mongodb+srv://dbUserClinic:shaw2115@cluster0-4xssw.azure.mongodb.net/test";
//const db = "mongodb://localhost/clinic"; 

const db = config.get('db');
const dbStringInfo = db.length > 20 ? db.substring(0,20) : "check db connection";

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
  })
  .then(() => winston.info(`Connected to MongoDB... ${dbStringInfo}`));
  

app.use(express.json());
app.use(cors());
app.use('/api/patients', patients);
app.use('/api/records', records);
app.use('/', home);
app.use(error);

const port = process.env.PORT || 3099 ;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));
