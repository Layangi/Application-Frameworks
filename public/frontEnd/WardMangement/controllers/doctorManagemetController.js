
angular.module("doctor", []).controller("doctorController", function ($scope,$http) {


    $scope.patientsArr=[];
    $scope.DocArray=[];


    //Get Registered patients
    $http.get('http://localhost:5001/Registartion').then(result=>{
        console.log(result.data);
        $scope.patientsArr=result.data;
    });

    //get data from ward table in order to display
    $http.get('http://localhost:4001/doctors',$scope.tempObj).then(result3=>{

        $scope.DocArray=result3.data;


    });


    //fill data to text boxes after click add to ward button
    $scope.addToDoc=function (patient) {

        $scope.patient={};
        $scope.patient.firstName=patient.first_name;
        $scope.patient.secondName=patient.last_name;
        $scope.patient.patient_id=patient.registration_number;
        $scope.patient._id=patient._id;
        $scope.patient.age = patient.age;
    }

    //clear data function
    $scope.clearData=function () {
        $scope.patient={};
    }

    //add function
    $scope.tempObj={};
    $scope.AddPatient=function (patient) {


        //check all the values are filed properly
        if(patient.firstName!=null && patient.firstName!="" && patient.secondName!=null && patient.secondName!=""
            && patient != undefined && patient.docName != null && patient.docSpecialization != null && patient.status != null&&
            patient.docName !=""&&patient.docSpecialization != "" && patient.status != "" &&  patient.docDepartment != null&&
            patient.docDepartment !=""){

            $scope.tempObj={
                "patient_id":patient.patient_id,
                "doctor_id":Date.now(),
                "patient_first_name":patient.firstName,
                "patient_last_name":patient.secondName,
                "patient_age":patient.age,
                "doctor_name":patient.docName,
                "doctor_specialization":patient.docSpecialization,
                "patient_status":patient.status,
                "doctor_department":patient.docDepartment
            };

            console.log($scope.tempObj);

            $http.post('http://localhost:4001/doctors',$scope.tempObj).then(result=>{

                //update the status of patient
                $http.put('http://localhost:5001/Registartion/doctorStatus/'+patient._id,{"doctor_status": "Yes"}).then(result2=>{

                    //get data from ward table in order to display
                    $http.get('http://localhost:4001/doctors',$scope.tempObj).then(result3=>{

                        $scope.DocArray=result3.data;

                        alert('Patient successfully Added');
                        location.reload();
                    });


                });

            });

        }else{
            alert('Enter correct values to Add a Doctor.');
        }

    }

    //delete patient from the ward
    $scope.deleteData=function (patient) {

        var value = confirm('Do you want to delete doctor from patient!!!',)

        if(value){
            $http.delete('http://localhost:4001/doctors/'+patient._id).then(result=>{
                $scope.DocArray.splice( $scope.DocArray.indexOf(patient),1);
            });
        }


    }

    //load data from the button
    $scope.loadData=function (patient) {

        $scope.patient={};
        $scope.patient.firstName=patient.patient_first_name;
        $scope.patient.secondName=patient.patient_last_name;
        $scope.patient.patient_id=patient.patient_id;
        $scope.patient.docName=patient.doctor_name;
        $scope.patient.docSpecialization=patient.doctor_specialization;
        $scope.patient.docDepartment=patient.doctor_department;
        $scope.patient.status=patient.patient_status;
        $scope.patient._id=patient._id;
        $scope.patient.docId = patient.doctor_id;
        $scope.patient.age = patient.patient_age;

    }

    $scope.UpdateTable=function (patient) {

        //check all the values are filed properly
        if(patient.firstName!=null && patient.firstName!="" && patient.secondName!=null && patient.secondName!=""
            && patient != undefined && patient.docName != null && patient.docSpecialization != null && patient.status != null&&
            patient.docName !=""&&patient.docSpecialization != "" && patient.status != ""  && patient.docDepartment != null&&
            patient.docDepartment !=""){

            $scope.tempObj={
                "patient_id":patient.patient_id,
                "doctor_id":patient.docId,
                "patient_first_name":patient.firstName,
                "patient_last_name":patient.secondName,
                "patient_age":patient.age,
                "doctor_name":patient.docName,
                "doctor_specialization":patient.docSpecialization,
                "patient_status":patient.status,
                "doctor_department":patient.docDepartment
            };


            console.log($scope.tempObj);

            $http.put('http://localhost:4001/doctors/'+patient._id,$scope.tempObj).then(result=>{



                //get data from ward table in order to display
                $http.get('http://localhost:4001/doctors',$scope.tempObj).then(result3=>{

                    $scope.DocArray=result3.data;

                    alert('Patient successfully Updated');
                    location.reload();

                });


            });


        }else{
            alert('Enter correct values to Update Docter.');
        }

    }

});