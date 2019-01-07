'use strict';

const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({

    registration_number:Number,
    first_name:String,
    last_name:String,
    date_of_birth:Date,
    age:Number,
    address:String,
    gender:String,
    blood_group:String,
    gurantor_name:String,
    gurantor_phone:String,
    date_of_admission:Date,
    ward_status:String,
    surgery_status:String,
    doctor_status:String

});



module.exports = mongoose.model('Registartion', RegistartionSchema);
