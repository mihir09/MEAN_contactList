function AppCtrl($scope, $http){

    var refresh = ()=> $http.get('/contacts')
        .then(function(response) {
            $scope.contactList = response.data;
            $scope.deselect();
        })
        .catch(function(error) {
            console.error("Error" + error);
        });

    refresh();

    $scope.addContact = ()=>{
        $http.post('/contacts', $scope.contact).success(function(response){
            refresh();

        })
    }

    $scope.remove = (id)=>{
        $http.delete('/contacts/'+ id).success(function(response){
            refresh();
        })
    }

    $scope.edit = (id)=>{
        $http.get('/contacts/'+ id).success(function(response){
            $scope.c = response;
        })
    }

    $scope.update = (id)=>{
        $http.put('/contacts/'+ id, $scope.c).success(function(response){
            refresh();
        })
    }

    $scope.deselect = ()=>{

         $scope.contact = {
            name: '',
            email: '',
            number: ''
        };
         $scope.contactForm.$setPristine();
         angular.forEach($scope.contactForm, function(field, fieldName) {
            if (fieldName.charAt(0) !== '$' && field.$touched) {
                field.$touched = false;
            }
        });

    }
    
}