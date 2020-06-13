const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require("mongoose");
const patients = require('./routes/patients');
const records = require('./routes/records');
var cors = require('cors')
const express = require('express');
const app = express();
const config = require('config');


//const db = "mongodb+srv://dbUserClinic:shaw2115@cluster0-4xssw.azure.mongodb.net/test";

const db = config.get('db');
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));
  

app.use(express.json());
app.use(cors());
app.use('/api/patients', patients);
app.use('/api/records', records);



const port = process.env.PORT || 3099 ;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));
