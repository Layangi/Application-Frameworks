/**
 * Created by nuwani on 6/30/2017.
 */
'use strict';

const mongoose = require('mongoose');

const surgeonSchema = new mongoose.Schema({

    patient_id:Number,
    surgeon_id:Number,
    patient_first_name:String,
    patient_last_name:String,
    patient_age:Number,
    surgeon_name:String,
    surgeon_specialization:String,
    surgeon_status:String,

});



module.exports = mongoose.model('surgeon',surgeonSchema);