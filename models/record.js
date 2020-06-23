const mongoose = require("mongoose");
const Joi = require("joi");
const { patientSchema } = require("./patient");

const Record = mongoose.model(
  "Record",
  new mongoose.Schema({
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    fee: {
      type: Number,
      required: true,
    },
    description: String,
    medicine: String,
    // nextAppointmentDate: {type: Date},
    // age: {
    //   type: String,
    //   required: true,
    // },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
    },
  })
);

validate = (record) => {
  const schema = {
    patientId: Joi.objectId().required(),
    // date: Joi.date(),
    // nextAppointmentDate: Joi.date().allow(null),
    fee: Joi.number().required(),
    description: Joi.string().max(500),
    medicine: Joi.string().max(500),
  };
  return Joi.validate(record, schema);
};

exports.Record = Record;
exports.validate = validate;
