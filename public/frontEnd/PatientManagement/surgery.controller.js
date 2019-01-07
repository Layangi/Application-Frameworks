var myApp = angular.module('myApp', []);

myApp.controller('SurgeryController', ['$scope', '$http', function($scope, $http) {
    getSurgery();
    function getSurgery() {
        $http.get('/surgeryInfo/').then(response => {
            $scope.surgerys = response.data;
            $scope.Sinfo = null;
        });
    };

    $scope.clear=function(){
        $scope.Sinfo=null;
    };

    $scope.addSurgery = () => {
        $http.post('/surgeryInfo/',$scope.Sinfo).then(function(response){
            alert("Successfully Added !");

            getSurgery();

        });
    };

    $scope.update = () =>{
        $http.put('/surgeryInfo/'+$scope.Sinfo._id,$scope.Sinfo).then(function(response){
            alert("Successfully Updated!");

            getSurgery();
            clear();
        });
    };

    $scope.editSur = (id) =>{
        $http.get('/surgeryInfo/'+id).then(function(response){
            $scope.Sinfo=response.data;

        });
    };

    $scope.remove = (id) =>{

        $http.delete('/surgeryInfo/'+id).then(function(response){
            alert("Surgery Cancelled !");

            getSurgery();

        });
    };

    $scope.Sinfo = [];

    $scope.date = new Date();
}]);

