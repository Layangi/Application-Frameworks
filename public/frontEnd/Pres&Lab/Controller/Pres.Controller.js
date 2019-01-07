var myApp = angular.module('myApp', []);

myApp.controller('PresController', ['$scope', '$http', function($scope, $http) {

    getPres();
    getPatient();

    function getPres() {
        $http.get('/Prescription/').then(response => {

            $scope.Prescriptions = response.data;
            $scope.Prescription = null;
        });
    };

    $scope.clear=function(){
        $scope.Prescription=null;
    };

    $scope.clearSearch=function(){
        $scope.searchVal=null;
        $http.get('/Prescription/').then(response => {

            $scope.Prescriptions = response.data;
            $scope.Prescription = null;
        });

    };

    $scope.addPres = () => {
        $http.post('/Prescription/',$scope.Prescription).then(function(response,err){

            getPres();
            if(err){

                alert('Something went wrong with you!')
            }
            alert('Succesfully added');

        });
    };

    $scope.update = () =>{
        $http.put('/Prescription/'+$scope.Prescription._id,$scope.Prescription).then(function(response){

            getPres();
            clear();
            alert('Successfully updated');
        });
    };

    $scope.edit = (id) =>{
        $http.get('/Prescription/'+id).then(function(response){
            $scope.Prescription=response.data;

        });
    };

    $scope.remove = (id) =>{

        $http.delete('/Prescription/'+id).then(function(response){

            getPres();
            alert('Successfully deleted');

        });
    };

    $scope.date = new Date();

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
    $scope.disabletext = {'visibility':'hidden'};

}]);
