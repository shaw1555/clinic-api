const mongoose = require("mongoose");
const patients = require('./routes/patients');
const express = require('express');
const app = express();


mongoose
  .connect("mongodb://localhost:27017/clinic", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));
  

app.use(express.json());
app.use('/api/patients', patients);



const port = process.env.port || 3099 ;
app.listen(port, ()=> console.log(`Listening on port ${port}...`));