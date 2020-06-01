const express = require("express");
const router = express.Router();
const {Patient, validate} = require('../models/patient');

router.get("/", async (req, res) => {
  const patients = await Patient.find().sort("name");
  res.send(patients);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { body } = req;
  let patient = new Patient({
    name: body.name,
    dateOfYear: body.dateOfYear,
    address: body.address,
    mobileNo: body.mobileNo,
    date: body.date,
  });
  patient = await patient.save();
  res.send(patient);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { body } = req;
  const patient = await Patient.findByIdAndUpdate(
    req.params.id,
    {
      name: body.name,
      dateOfYear: body.dateOfYear,
      address: body.address,
      mobileNo: body.mobileNo,
      date: body.date,
    },
    { new: true }
  );
  if (!patient)
    return res.status(404).send("The patient with the given ID not found");
  res.send(patient);
});

router.delete("/:id", async (req, res) => {
  const patient = await Patient.findByIdAndRemove(req.params.id);
  if (!patient)
    return res.status(404).send("The patient with the given ID not found");
  res.send(patient);
});

router.get("/:id", async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient)
    return res.status(404).send("The patient with the given ID not found");
  res.send(patient);
});


module.exports = router;
