angular.module("ward", []).controller("wardController", function ($scope,$http) {


    $scope.patientsArr=[];
    $scope.wardArray=[];


    //Get Registered patients
    $http.get('http://localhost:5001/Registartion').then(result=>{
        console.log(result.data);
        $scope.patientsArr=result.data;
    });

    //get data from ward table in order to display
    $http.get('http://localhost:4000/wards',$scope.tempObj).then(result3=>{

        $scope.wardArray=result3.data;
        //convert date in to viweble format
        for(var i=0;i<$scope.wardArray.length;i++){
            var testDate = $scope.wardArray[i].date_of_admission;
            var date2=new Date(testDate);
            $scope.wardArray[i].date_of_admission= date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();

        }

    });


    //fill data to text boxes after click add to ward button
    $scope.addToWard=function (patient) {

        $scope.patient={};
        $scope.patient.firstName=patient.first_name;
        $scope.patient.secondName=patient.last_name;
        $scope.patient.registration_number=patient.registration_number;
        $scope.patient.age=patient.age;
        $scope.patient._id=patient._id;
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
                && patient != undefined && patient.wardNo != null && patient.roomNo != null && patient.admitDate != null&&
                patient.wardNo !=""&&patient.roomNo != "" && patient.admitDate != ""){

                $scope.tempObj={
                    "registration_number":patient.registration_number,
                    "first_name":patient.firstName,
                    "last_name":patient.secondName,
                    "age":patient.age,
                    "ward_no":patient.wardNo,
                    "room_no":patient.roomNo,
                    "date_of_admission": new Date(patient.admitDate)
                };

                console.log($scope.tempObj);

                $http.post('http://localhost:4000/wards',$scope.tempObj).then(result=>{

                    //update the status of patient
                    $http.put('http://localhost:5001/Registartion/wardStatus/'+patient._id,{"ward_status": "Yes"}).then(result2=>{

                        //get data from ward table in order to display
                        $http.get('http://localhost:4000/wards',$scope.tempObj).then(result3=>{

                            $scope.wardArray=result3.data;
                            //convert date in to viweble format
                            for(var i=0;i<$scope.wardArray.length;i++){
                                var testDate = $scope.wardArray[i].date_of_admission;
                                var date2=new Date(testDate);
                                $scope.wardArray[i].date_of_admission= date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
                            }
                            alert('Patient successfully Added');
                            location.reload();
                        });


                    });

                });
                
            }else{
                alert('Enter correct values to Add ward.');
            }

    }
    
    //delete patient from the ward
    $scope.deleteData=function (ward) {

        var value = confirm('Do you want to delete this patient from the ward!!!',)

        if(value){
            $http.delete('http://localhost:4000/wards/'+ward._id).then(result=>{
                $scope.wardArray.splice( $scope.wardArray.indexOf(ward),1);
            });
        }


    }

    //load data from the button
    $scope.loadData=function (ward) {

        $scope.patient={};
        $scope.patient.firstName=ward.first_name;
        $scope.patient.secondName=ward.last_name;
        $scope.patient.roomNo=ward.ward_no;
        $scope.patient.wardNo=ward.room_no;
        $scope.patient.admitDate=new Date(ward.date_of_admission);
        $scope.patient.dischargeDate=new Date(ward.date_of_discharge);
        $scope.patient.registration_number=ward.registration_number;
        $scope.patient.age=ward.age;
        $scope.patient._id=ward._id;

    }
    
    $scope.UpdateTable=function (patient) {

        //check all the values are filed properly
        if(patient.firstName!=null && patient.firstName!="" && patient.secondName!=null && patient.secondName!=""
            && patient != undefined && patient.wardNo != null && patient.roomNo != null && patient.admitDate != null&&
            patient.wardNo !=""&&patient.roomNo != "" && patient.admitDate != ""){

            //chech discharge date is empty or not
            if(patient.dischargeDate != "" && patient.dischargeDate != ""){
                $scope.tempObj={
                    "registration_number":patient.registration_number,
                    "first_name":patient.firstName,
                    "last_name":patient.secondName,
                    "age":patient.age,
                    "ward_no":patient.wardNo,
                    "room_no":patient.roomNo,
                    "date_of_admission": new Date(patient.admitDate),
                    "date_of_discharge": new Date(patient.dischargeDate)
                };
            }
            else{
                $scope.tempObj={
                    "registration_number":patient.registration_number,
                    "first_name":patient.firstName,
                    "last_name":patient.secondName,
                    "age":patient.age,
                    "ward_no":patient.wardNo,
                    "room_no":patient.roomNo,
                    "date_of_admission": new Date(patient.admitDate),

                };
            }


            console.log($scope.tempObj);

            $http.put('http://localhost:4000/wards/'+patient._id,$scope.tempObj).then(result=>{



                    //get data from ward table in order to display
                    $http.get('http://localhost:4000/wards',$scope.tempObj).then(result3=>{

                        $scope.wardArray=result3.data;
                        //convert date in to viweble format
                        for(var i=0;i<$scope.wardArray.length;i++){
                            var testDate = $scope.wardArray[i].date_of_admission;
                            var date2=new Date(testDate);
                            $scope.wardArray[i].date_of_admission= date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();

                        }
                        alert('Patient successfully Updated');
                        location.reload();

                    });


            });


        }else{
            alert('Enter correct values to Update ward.');
        }

    }
    
});