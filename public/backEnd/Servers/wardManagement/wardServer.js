//adding dependencies

const wardSchema = require('../../Schemas/wardSchema');
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


app.post('/wards',(req,res)=>{

    const wardModel =    new wardSchema(req.body);
    wardModel.save().then(ward=>{
        res.json(ward);

    }).catch(err=>{
        console.error(err);
        res.sendStatus(500);
    });
});

app.get('/wards',(req,res)=>{
    wardSchema.find().exec().then(wards=>{
        res.json(wards);

    }).catch(err=>{
        console.error(err);
        res.sendStatus(500);
    })
});

app.get('/wards/:id',(req,res)=>{
    wardSchema.findById(req.params.id).exec().then(ward=>{
        res.json(ward);
    }).catch(err=>{
        console.error(err);
        res.sendStatus(500);
    });
});


app.put('/wards/:id',(req,res)=>{
    wardSchema.findByIdAndUpdate(req.params.id,{registration_number:req.body.registration_number,
        first_name:req.body.first_name,age:req.body.age,ward_no:req.body.ward_no,room_no:req.body.room_no,
        date_of_admission:req.body.date_of_admission,date_of_discharge:req.body.date_of_discharge}).then(ward=>{
        res.json(ward);
    }).catch(err=>{
        console.error(err);
        res.sendStatus(500);
    });
});


app.delete('/wards/:id',(req,res)=>{
    wardSchema.remove({_id:req.params.id}).then(output=>{
        res.json(output);
    }).catch(err=>{
        console.error(err);
        res.sendStatus(500);
    });
});

app.listen(4000,err=>{
    if(err){
        console.log(err);
        return;
    }
    console.log('API listen to port 4000');
});