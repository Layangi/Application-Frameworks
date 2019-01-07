/**
 * Created by DELL on 7/1/2017.
 */

var myApp = angular.module('myApp', []);

myApp.controller('RegController', ['$scope', '$http', function($scope, $http) {
    getReg();
    function getReg() {
        $http.get('/Registartion/').then(response => {
            $scope.Registartions = response.data;
            $scope.Registartion = null;
        });
    };

    $scope.clear=function(){
        $scope.Registartion=null;
    };

    $scope.clearSearch=function(){
        $scope.searchVal=null;
        getReg();
    };

    $scope.addReg = () => {
        $http.post('/Registartion/',$scope.Registartion).then(function(response){
        alert('Successfully added!!!');
            getReg();

        });
    };

    $scope.update = () =>{
        $http.put('/Registartion/'+$scope.Registartion._id,$scope.Registartion).then(function(response){
            alert('Successfully updated!!!');
            getReg();
            clear();
        });
    };

    $scope.edit = (id) =>{
        $http.get('/Registartion/'+id).then(function(response){
            $scope.Registartion=response.data;

        });
    };

    $scope.remove = (id) =>{

        $http.delete('/Registartion/'+id).then(function(response){
            alert('Successfully deleted!!!');
            getReg();

        });
    };

    $scope.Registartion = [];

    $scope.addNew = function (Registartion) {
        $scope.Registartion.push({

            'registration_number':Registartion,
            'first_name':Registartion,
            'last_name':Registartion,
            'date_of_birth':Registartion,
            'age':Registartion,
            'address':Registartion,
            'gender':Registartion,
            'blood_group':Registartion,
            'gurantor_name':Registartion,
            'gurantor_phone':Registartion,
            'date_of_admission':Registartion,
            'ward_status':Registartion,
            'surgery_status':Registartion,
            'doctor_status':Registartion



        });
    };
}]);

