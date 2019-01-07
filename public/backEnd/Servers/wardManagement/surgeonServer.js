//adding dependencies

const Surgeon = require('../../Schemas/surgeonSchema');
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


app.post('/surgeons',(req,res)=>{

    const SurgeondModel =    new Surgeon(req.body);
    SurgeondModel.save().then(surgeon=>{
        res.json(surgeon);

    }).catch(err=>{
        console.error(err);
        res.sendStatus(500);
    });
});

app.get('/surgeons',(req,res)=>{
    Surgeon.find().exec().then(surgeons=>{
        res.json(surgeons);

    }).catch(err=>{
        console.error(err);
        res.sendStatus(500);
    })
});

app.get('/surgeons/:id',(req,res)=>{
    Surgeon.findById(req.params.id).exec().then(surgeon=>{
        res.json(surgeon);
    }).catch(err=>{
        console.error(err);
        res.sendStatus(500);
    });
});


app.put('/surgeons/:id',(req,res)=>{
    Surgeon.findByIdAndUpdate(req.params.id,{patient_id:req.body.patient_id,
        surgeon_id:req.body.surgeon_id,patient_first_name:req.body.patient_first_name,patient_last_name:req.body.patient_last_name,
        patient_age:req.body.patient_age,surgeon_name:req.body.surgeon_name,surgeon_specialization:req.body.surgeon_specialization,
        surgeon_status:req.body.surgeon_status}).then(surgeon=>{
        res.json(surgeon);
    }).catch(err=>{
        console.error(err);
        res.sendStatus(500);
    });
});


app.delete('/surgeons/:id',(req,res)=>{
    Surgeon.remove({_id:req.params.id}).then(output=>{
        res.json(output);
    }).catch(err=>{
        console.error(err);
        res.sendStatus(500);
    });
});

app.listen(4100,err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('API listen to port 4100');
});