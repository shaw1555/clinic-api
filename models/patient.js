const mongoose = require("mongoose");
const Joi = require("joi");

const Patient = mongoose.model("Patient", new mongoose.Schema({
  name: { type: String, required: true },
  dateOfYear: { type: Number, required: true },
  address: String,
  mobileNo: String,
  date: { type: Date, required: true, default: Date.now },
  dateOfBirth: { type: Date, required: true },
}));

validate = (patient) => {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    // age: Joi.number().required(),
    address: Joi.string(),
    mobileNo: Joi.string(),
    dateOfBirth: Joi.date().required()
  };
  return Joi.validate(patient, schema);
};

exports.Patient = Patient;
exports.validate = validate;
