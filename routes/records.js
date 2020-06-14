const express = require("express");
const router = express.Router();
const { Record, validate } = require("../models/record");
const { Patient } = require("../models/patient");
const { calculateAge } = require("../util/calculateAge");

router.get("/", async (req, res) => {
  let records = await Record.find()
    .populate("patient", "name address mobileNo")
    // .select("date fee description medicine nextAppointmentDate patient")
    .sort("-date");

  records = records.filter(x => x.patient != null);
  res.send(records);
});

router.get("/findByPatientId/:id", async (req, res) => {
  let records = await Record.find({ patient: req.params.id })
    .populate("patient", "name address mobileNo")
    // .select("date fee description medicine nextAppointmentDate patient")
    .sort("-date");
  res.send(records);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    patientId,
    date,
    fee,
    description,
    medicine,
    nextAppointmentDate,
  } = req.body;
  const age = await getAge(patientId);

  const record = new Record({
    date,
    fee,
    description,
    medicine,
    nextAppointmentDate,
    age,
    patient: patientId,
  });
  await record.save();
  res.send(record);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const {
    patientId,
    date,
    fee,
    description,
    medicine,
    nextAppointmentDate,
  } = req.body;
  const age = await getAge(patientId);

  const record = await Record.findByIdAndUpdate(
    req.params.id,
    {
      date,
      fee,
      description,
      medicine,
      nextAppointmentDate,
      age,
      patient: patientId,
    },
    { new: true }
  );
  if (!record)
    return res.status(404).send("The record with the given ID not found");
  res.send(record);
});

router.delete("/:id", async (req, res) => {
  const record = await Record.findByIdAndRemove(req.params.id);
  if (!record)
    return res.status(404).send("The record with the given ID not found");
  res.send(record);
});

router.get("/:id", async (req, res) => {
  let record = await Record.findById(req.params.id).populate(
    "patient",
    "name address mobileNo"
  );
  // .select("date fee description medicine nextAppointmentDate patient");
  if (!record)
    return res.status(404).send("The record with the given ID not found");
  res.send(record);
});

getAge = async (patientId) => {
  const patient = await Patient.findById(patientId);
  return calculateAge(patient._doc.dateOfYear);
};

module.exports = router;
