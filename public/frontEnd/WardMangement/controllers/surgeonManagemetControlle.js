
angular.module("surgeon", []).controller("surgeonController", function ($scope,$http) {


    $scope.patientsArr=[];
    $scope.SurgArray=[];


    //Get Doctor Assigned Patients
    $http.get('http://localhost:5001/Registartion').then(result=>{
        console.log(result.data);
        $scope.patientsArr=result.data;
    });

    //get data from ward table in order to display
    $http.get('http://localhost:4100/surgeons',$scope.tempObj).then(result3=>{

        $scope.SurgArray=result3.data;


    });


    //fill data to text boxes after click add to Surgery button
    $scope.addToSurg=function (patient) {

        //left side is the table names in db and right side is the table names in the web page
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
            && patient != undefined && patient.surgName != null && patient.surgSpecialization != null && patient.surgStatus != null &&
            patient.surgName !=""&&patient.surgSpecialization != "" && patient.surgStatus != ""){

            $scope.tempObj={
                "patient_id":patient.patient_id,
                "surgeon_id":Date.now(),
                "patient_first_name":patient.firstName,
                "patient_last_name":patient.secondName,
                "patient_age":patient.age,
                "surgeon_name":patient.surgName,
                "surgeon_specialization":patient.surgSpecialization,
                "surgeon_status":patient.surgStatus
            };

            console.log($scope.tempObj);
			
        }else{
            alert('Enter correct values to Add a Surgeon.');
        }

    }

    //delete patient from the ward
    $scope.deleteData=function (patient) {

        var value = confirm('Do you want to delete surgeon from patient!!!',)

        if(value){
            $http.delete('http://localhost:4100/surgeons/'+patient._id).then(result=>{
                $scope.SurgArray.splice( $scope.SurgArray.indexOf(patient),1);
            });
        }


    }

    //load data from the button
    $scope.loadData=function (patient) {

        $scope.patient={};
        $scope.patient.firstName=patient.patient_first_name;
        $scope.patient.secondName=patient.patient_last_name;
        $scope.patient.patient_id=patient.patient_id;
        $scope.patient.surgName=patient.surgeon_name;
        $scope.patient.surgSpecialization=patient.surgeon_specialization;
        $scope.patient.surgStatus=patient.surgeon_status;
        $scope.patient._id=patient._id;
        $scope.patient.surgId = patient.surgeon_id;
        $scope.patient.age = patient.patient_age;

    }

    $scope.UpdateTable=function (patient) {

        //check all the values are filed properly
        if(patient.firstName!=null && patient.firstName!="" && patient.secondName!=null && patient.secondName!=""
            && patient != undefined && patient.surgName != null && patient.surgSpecialization != null && patient.surgStatus != null&&
            patient.surgName !=""&&patient.surgSpecialization != "" && patient.surgStatus != ""){

            $scope.tempObj={
                "patient_id":patient.patient_id,
                "surgeon_id":Date.now(),
                "patient_first_name":patient.firstName,
                "patient_last_name":patient.secondName,
                "patient_age":patient.age,
                "surgeon_name":patient.surgName,
                "surgeon_specialization":patient.surgSpecialization,
                "surgeon_status":patient.surgStatus
            };


            console.log($scope.tempObj);

            $http.put('http://localhost:4100/surgeons'+patient._id,$scope.tempObj).then(result=>{



                //get data from ward table in order to display
                $http.get('http://localhost:4100/surgeons',$scope.tempObj).then(result3=>{

                    $scope.SurgArray=result3.data;

                    alert('Patient successfully Updated');
                    location.reload();

                });
            });
        }else{
            alert('Enter correct values to Update Surgeon.');
        }

    }

});