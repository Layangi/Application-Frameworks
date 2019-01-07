var myApp = angular.module('myApp', []);

myApp.controller('PatientController', ['$scope', '$http', function($scope, $http) {
    getHistory();
    getPatient();
    function getHistory() {
        $http.get('/checkHistory/').then(response => {
            $scope.patients = response.data;
        $scope.Pinfo = null;
    });
    };

    $scope.clear=function(){
        $scope.Pinfo=null;
    };

    $scope.addPatient = () => {
        $http.post('/checkHistory/',$scope.Pinfo).then(function(response){
            alert("Successfully Added !");
            getHistory();

        });
    };

    $scope.update = () =>{
        $http.put('/checkHistory/'+$scope.Pinfo._id,$scope.Pinfo).then(function(response){
            alert("Successfully Updated !");

            getHistory();
            clear();
        });
    };

    $scope.edit = (id) =>{
        $http.get('/checkHistory/'+id).then(function(response){
            $scope.Pinfo=response.data;

        });
    };

    $scope.remove = (id) =>{

        $http.delete('/checkHistory/'+id).then(function(response){
            alert("Successfully Deleted !");

            getHistory();

        });
    };

    $scope.Pinfo = [];

    $scope.date = new Date();

    function getPatient() {
        $http.get('/regInfo/').then(response => {
            $scope.regis = response.data;
            $scope.reg = null;
        });
    };

    $scope.editReg = (id) =>{
        $http.get('/regInfo/'+id).then(function(response){
            $scope.reg=response.data;

        });
    };

}]);

