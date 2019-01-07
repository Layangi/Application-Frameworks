'use strict';

const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({

    patient_id:Number,
    doctor_id:Number,
    patient_first_name:String,
    patient_last_name:String,
    patient_age:Number,
    doctor_name:String,
    doctor_specialization:String,
    patient_status:String,
    doctor_department:String

});



module.exports = mongoose.model('doctor',doctorSchema);