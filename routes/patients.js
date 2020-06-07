const express = require("express");
const router = express.Router();
const { Patient, validate } = require("../models/patient");
const { calculateAge, calculateDateOfYear } = require("../util/calculateAge");

router.get("/", async (req, res) => {
  let patients = await Patient.find().sort("-date");
  patients.map((x) => x = addAgeColumn(x));
  res.send(patients);
});

router.post("/", async (req, res) => {
  const { error } = validate({
    name: req.body.name,
    age: req.body.age,
    address: req.body.address,
    mobileNo: req.body.mobileNo,
  });
  if (error) return res.status(400).send(error.details[0].message);

  req.body.dateOfYear = calculateDateOfYear(req.body.age);

  const { body } = req;
  const patient = new Patient({
    name: body.name,
    dateOfYear: body.dateOfYear,
    address: body.address,
    mobileNo: body.mobileNo,
    date: body.date,
  });
  await patient.save();
  
  res.send(addAgeColumn(patient));
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  req.body.dateOfYear = calculateDateOfYear(req.body.age);

  const { body } = req;
  const patient = await Patient.findByIdAndUpdate(
    req.params.id,
    {
      name: body.name,
      dateOfYear: body.dateOfYear,
      address: body.address,
      mobileNo: body.mobileNo,
    },
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
  patient._doc.age = calculateAge(patient._doc.dateOfYear);
  return patient;
};


module.exports = router;
