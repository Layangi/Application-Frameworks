/**
 * Created by nadika on 5/4/2017.
 */
var express=require('express');
var app=express();
var mongojs=require('mongojs');

var PCUpres=mongojs('PCU',['PrescriptionD']);
var PCUlab=mongojs('PCU',['LabTest']);
var PCUreg = mongojs('PCU',['Registartion']);
var PCUpatient = mongojs('PCU',['Patient']);
var PCU2 = mongojs('PCU',['Surgery']);
var bodyParser=require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/', (req, res) => {

 res.sendFile(__dirname + '/public/Main.html');
 });

app.get('/Prescription',function(req,res){

    PCUpres.PrescriptionD.find(function(err,docs){

        res.json(docs);
    });

});


//inserting values to the database
app.post('/Prescription',function(req,res){

    PCUpres.PrescriptionD.insert(req.body,function(err,docs){
        res.json(docs);//return data to controller
        console.log(docs);

    });
});

//delete data from the database
app.delete('/Prescription/:id',function(req,res){
    var id=req.params.id
    PCUpres.PrescriptionD.remove({_id:mongojs.ObjectId(id)},function(err,docs){
        res.json(docs);//remove  data to controller

    });
});

//load that data from db
app.get('/Prescription/:id',function(req,res){
    var id=req.params.id
    PCUpres.PrescriptionD.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
        res.json(docs);
    });

});

app.put('/Prescription/:id',function(req,res){
    var id=req.params.id
    PCUpres.PrescriptionD.findAndModify({Query:{_id:mongojs.ObjectId(id)},
        update:{$set:{
            registration_number:req.body.registration_number,
            type:req.body.type,
            prescriptionCode:req.body.prescriptionCode,
            prescriptionName:req.body.prescriptionName,
            category : req.body.category,
            unit : req.body.unit,
            quantity: req.body.quantity,
            date : req.body.date
        }},
        new:true},function(err,doc){
        res.json(doc);

    });

});

app.get('/LabTests',function(req,res){

    PCUlab.LabTest.find(function(err,docs){
        res.json(docs);
    });

});


//inserting values to the database
app.post('/LabTests',function(req,res){
    PCUlab.LabTest.insert(req.body,function(err,docs){
        res.json(docs);//return data to controller

    });
});

app.delete('/LabTests/:id',function(req,res){
    var id=req.params.id
    PCUlab.LabTest.remove({_id:mongojs.ObjectId(id)},function(err,docs){
        res.json(docs);//remove  data to controller

    });
});

//load that data from db
app.get('/LabTests/:id',function(req,res){
    var id=req.params.id
    PCUlab.LabTest.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
        res.json(docs);
    });

});

app.put('/LabTests/:id',function(req,res){
    var id=req.params.id
    PCUlab.LabTest.findAndModify({Query:{_id:mongojs.ObjectId(id)},
        update:{$set:{
            registration_number:req.body.registration_number,
            testCode:req.body.testCode,
            testName:req.body.testName,
            date:req.body.date}},
        new:true},function(err,doc){
        res.json(doc);

    });

});

app.get('/Registartion',function(req,res){
    PCUreg.Registartion.find(function(err,docs){

        res.json(docs);
        console.log(docs);
    });

});

app.get('/Registartion/:id',function(req,res){
    var id=req.params.id
    PCUreg.Registartion.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
        console.log(docs);
        res.json(docs);
    });

});

app.post('/Registartion',function(req,res){
    // console.log(req.body);
    PCUreg.Registartion.insert(req.body,function(err,docs){
        res.json(docs);//return data to controller

    });
});

app.delete('/Registartion/:id',function(req,res){
    var id=req.params.id
    PCUreg.Registartion.remove({_id:mongojs.ObjectId(id)},function(err,docs){
        res.json(docs);//remove  data to controller

    });
});

app.put('/Registartion/:id',function(req,res){
    var id=req.params.id
    PCUreg.Registartion.findAndModify({Query:{_id:mongojs.ObjectId(id)},
        update:{$set:{
            registration_number:req.body.registration_number,
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            date_of_birth:req.body.date_of_birth,
            age : req.body.age,
            address : req.body.address,
            gender : req.body.gender,
            blood_group : req.body.blood_group,
            gurantor_name : req.body.gurantor_name,
            gurantor_phone: req.body.gurantor_phone,
            date_of_admission : req.body.date_of_admission,
            ward_status : req.body.ward_status,
            surgery_status : req.body.surgery_status,
            doctor_status : req.body.doctor_status,

        }},
        new:true},function(err,doc){
        res.json(doc);

    });

});

app.get('/checkHistory',function(req,res){

    PCUpatient.Patient.find(function(err,docs){
        console.log(docs);
        res.json(docs);
    });

});


//inserting values to the database
app.post('/checkHistory',function(req,res){
    console.log(req.body);
    PCUpatient.Patient.insert(req.body,function(err,docs){
        res.json(docs);//return data to controller

    });
});

app.delete('/checkHistory/:id',function(req,res){
    var id=req.params.id
    PCUpatient.Patient.remove({_id:mongojs.ObjectId(id)},function(err,docs){
        res.json(docs);//remove  data to controller

    });
});

//load that data from db
app.get('/checkHistory/:id',function(req,res){
    var id=req.params.id
    PCUpatient.Patient.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
        console.log(docs);
        res.json(docs);
    });

});

app.put('/checkHistory/:id',function(req,res){
    var id=req.params.id
    PCUpatient.Patient.findAndModify({Query:{_id:mongojs.ObjectId(id)},
        update:{$set:{
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            gender:req.body.gender,
            bloodGroup:req.body.bloodGroup,
            illness:req.body.illness,
            allergy:req.body.allergy,
            height:req.body.height,
            weight:req.body.weight,
            mentalState:req.body.mentalState,
            backPain:req.body.backPain,
            note:req.body.note,
            contactNo:req.body.contactNo,
            age:req.body.age,
            address:req.body.address,
            nic:req.body.nic,
            dateOfBirth: req.body.dateOfBirth
        }},
        new:true},function(err,doc){
        res.json(doc);

    });

});

app.get('/surgeryInfo',function(req,res){

    PCU2.Surgery.find(function(err,docs){
        console.log(docs);
        res.json(docs);
    });

});


//inserting values to the database
app.post('/surgeryInfo',function(req,res){
    console.log(req.body);
    PCU2.Surgery.insert(req.body,function(err,docs){
        res.json(docs);//return data to controller

    });
});

app.delete('/surgeryInfo/:id',function(req,res){
    var id=req.params.id
    PCU2.Surgery.remove({_id:mongojs.ObjectId(id)},function(err,docs){
        res.json(docs);//remove  data to controller

    });
});

//load that data from db
app.get('/surgeryInfo/:id',function(req,res){
    var id=req.params.id
    PCU2.Surgery.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
        console.log(docs);
        res.json(docs);
    });

});

app.put('/surgeryInfo/:id',function(req,res){
    var id=req.params.id
    PCU2.Surgery.findAndModify({Query:{_id:mongojs.ObjectId(id)},

        update:{$set:{
            fName:req.body.fName,
            lName:req.body.lName,
            regDate:req.body.regDate,
            surgeryType:req.body.surgeryType,
            dueDate:req.body.dueDate,
            surgeryStatus:req.body.surgeryStatus,
            sgnote:req.body.sgnote,
            condition:req.body.condition

        }},
        new:true},function(err,doc){
        res.json(doc);

    });

});

app.get('/regInfo',function(req,res){

    PCUreg.Registartion.find(function(err,docs){
        console.log(docs);
        res.json(docs);
    });

});

//load that data from db
app.get('/regInfo/:id',function(req,res){
    var id=req.params.id
    PCUreg.Registartion.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
        console.log(docs);
        res.json(docs);
    });

});

app.get('/regInfo',function(req,res){
    PCUreg.Registartion.find(function(err,docs){

        res.json(docs);
        console.log(docs);
    });

});

app.listen(5001);
console.log("server listning 5001");
