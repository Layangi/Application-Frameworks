'use strict';

const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({

    registration_number:Number,
    first_name:String,
    last_name:String,
    age:Number,
    ward_no:Number,
    room_no:Number,
    date_of_admission:Date,
    date_of_discharge:Date

});



module.exports = mongoose.model('ward',registrationSchema);