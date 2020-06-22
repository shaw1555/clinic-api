const _ = require("lodash");
const express = require("express");
const router = express.Router();
const { Patient, validate } = require("../models/patient");
const { calculateAge, calculateDateOfYear, getDateOfYearFromDate} = require("../util/calculateAge");

router.get("/", async (req, res) => {
  let patients = await Patient.find().sort("-date");
  patients.map((x) => x = addAgeColumn(x));
  res.send(patients);
});

router.post("/", async (req, res) => {
  
  const { error } = validate(_.pick(req.body,['name', 'address', 'mobileNo', 'dateOfBirth']));
  if (error) return res.status(400).send(error.details[0].message);

  req.body.dateOfYear = getDateOfYearFromDate(req.body.dateOfBirth);


  const patient = new Patient(_.pick(req.body,['name', 'dateOfYear', 'address', 'mobileNo', 'date', 'dateOfBirth']));
  await patient.save();
  
  res.send(addAgeColumn(patient));
});

router.put("/:id", async (req, res) => {  
  const { error } = validate(_.pick(req.body,['name', 'address', 'mobileNo', 'dateOfBirth']));
  if (error) return res.status(400).send(error.details[0].message);

  req.body.dateOfYear = getDateOfYearFromDate(req.body.dateOfBirth);

  const patient = await Patient.findByIdAndUpdate(
    req.params.id,
    _.pick(req.body,['name', 'dateOfYear', 'address', 'mobileNo', 'dateOfBirth']),
    { new: true }
  );
  if (!patient)
    return res.status(404).send("The patient with the given ID not found");
  res.send(addAgeColumn(patient));
});

router.delete("/:id", async (req, res) => {
  const patient = await Patient.findByIdAndRemove(req.params.id);
  if (!patient)
    return res.status(404).send("The patient with the given ID not found");
  res.send(patient);
});

router.get("/:id", async (req, res) => {
  let patient = await Patient.findById(req.params.id);
  if (!patient)
    return res.status(404).send("The patient with the given ID not found");

  patient = addAgeColumn(patient);
  res.send(patient);
});

addAgeColumn = (patient) => {
  patient._doc.age = calculateAge(patient._doc.dateOfBirth);
  return patient;
};


module.exports = router;
