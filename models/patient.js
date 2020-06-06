const mongoose = require("mongoose");
const Joi = require("joi");

const Patient = mongoose.model("Patient", new mongoose.Schema({
  name: { type: String, required: true },
  dateOfYear: { type: Number, required: true },
  address: String,
  mobileNo: String,
  date: { type: Date, required: true, default: Date.now },
}));

validate = (customer) => {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    dateOfYear: Joi.number().required(),
    address: Joi.string(),
    mobileNo: Joi.string(),
    date: Joi.date(),
  };
  return Joi.validate(customer, schema);
};

exports.Patient = Patient;
exports.validate = validate;
