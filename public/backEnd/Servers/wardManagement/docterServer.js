//adding dependencies

const Doctor = require('../../Schemas/docterSchema');
const crossOrigine = require('../../Dependancies/cross');


const mongoose = require('mongoose'),
    express = require('express'),
    bodyParser = require('body-parser');


mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/PCU',err=>{
    if(err){
        console.log(err);
        process.exit(1);
    }
});

const app = express();
app.use(express.static(__dirname));
app.use(crossOrigine);
app.use(bodyParser.json());


app.post('/doctors',(req,res)=>{

    const DoctordModel =    new Doctor(req.body);
    DoctordModel.save().then(doctor=>{
        res.json(doctor);

    }).catch(err=>{
        console.error(err);
        res.sendStatus(500);
    });
});

app.get('/doctors',(req,res)=>{
    Doctor.find().exec().then(doctors=>{
        res.json(doctors);

    }).catch(err=>{
        console.error(err);
        res.sendStatus(500);
    })
});

app.get('/doctors/:id',(req,res)=>{
    Doctor.findById(req.params.id).exec().then(doctor=>{
        res.json(doctor);
    }).catch(err=>{
        console.error(err);
        res.sendStatus(500);
    });
});


app.put('/doctors/:id',(req,res)=>{
    Doctor.findByIdAndUpdate(req.params.id,{patient_id:req.body.patient_id,
        doctor_id:req.body.doctor_id,patient_first_name:req.body.patient_first_name,patient_last_name:req.body.patient_last_name,
        patient_age:req.body.patient_age,doctor_name:req.body.doctor_name,doctor_specialization:req.body.doctor_specialization,
        patient_status:req.body.patient_status,doctor_department:req.body.doctor_department}).then(doctor=>{
        res.json(doctor);
    }).catch(err=>{
        console.error(err);
        res.sendStatus(500);
    });
});


app.delete('/doctors/:id',(req,res)=>{
    Doctor.remove({_id:req.params.id}).then(output=>{
        res.json(output);
    }).catch(err=>{
        console.error(err);
        res.sendStatus(500);
    });
});

app.listen(4001,err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('API listen to port 4001');
});