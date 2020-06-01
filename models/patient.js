const mongoose = require("mongoose");
const Joi = require("joi");

const Patient = mongoose.model(
  "Patient",
  new mongoose.Schema({
    name: { type: String, required: true },
    dateOfYear: { type: Number, required: true },
    address: String,
    mobileNo: String,
    date: { type: Date, required: true },
  })
);

validate = (customer) => {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    dateOfYear: Joi.number(),
    date: Joi.date(),
  };
  return Joi.validate(customer, schema);
};


exports.Patient = Patient;
exports.validate = validate;