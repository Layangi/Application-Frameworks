var myApp = angular.module('myApp', []);

myApp.controller('LabController', ['$scope', '$http', function($scope, $http) {

    getLab();
    getPatient();

    function getLab() {
        $http.get('/LabTests/').then(response => {
            $scope.Tests = response.data;
            $scope.Test = null;
        });
    };

    $scope.clear=function(){
        $scope.Test=null;
    };

    $scope.clearSearch=function(){
        $scope.searchVal=null;
        getLab();
    };

    $scope.addLab = () => {
        $http.post('/LabTests/',$scope.Test).then(function(response){

            getLab();
            alert('Succesfully added');

        });
    };

    $scope.update = () =>{
        $http.put('/LabTests/'+$scope.Test._id,$scope.Test).then(function(response){

            getLab();
            clear();
            alert('Succesfully updated');
        });
    };

    $scope.edit = (id) =>{
        $http.get('/LabTests/'+id).then(function(response){
            $scope.Test=response.data;

        });
    };

    $scope.remove = (id) =>{

        $http.delete('/LabTests/'+id).then(function(response){

            getLab();
            alert('Succesfully deleted');

        });
    };

    $scope.Test = [];

    $scope.addNew = function (Test) {
        $scope.Test.push({

            'patientID':Test,
            'testCode':Test,
            'testName':Test,
            'date':Test
        });
    };

    function getPatient() {
        $http.get('/Registartion/').then(response => {

            $scope.patients = response.data;
            $scope.patient = null;
        });
    };

    $scope.editPatient = (id) =>{
        $http.get('/Registartion/'+id).then(function(response){
            $scope.patient=response.data;

        });
    };

    $scope.date = new Date();
}]);
