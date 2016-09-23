var app = angular.module('contactLists', []);

app.controller('AppCtrl', function($scope, $http){
	console.log("this is the controller");

	// $scope.contactList = 
	//[{"name":"Anand","email":"anand@imdb.com","phone":"(111) 111-1111"},
 	// {"name":"Phillip","email":"phillip@imdb.com","phone":"(222) 222-2222"},
 	// {"name":"Reyes","email":"reyes@imdb.com","phone":"(333) 333-3333"}];
 var refresh = function(){
		$http.get('/contactlist').success(function(response){
    	console.log('I got the data');
    	$scope.contactlist = response; 
    	$scope.contact = "";
    });
 }; 

 refresh();  

    $scope.addContact = function(){
    	console.log($scope.contact);
    	$http.post('/contactlist', $scope.contact).success(function(response){
    		console.log(response);
    		refresh();
    	});
    };

    $scope.remove = function(id){
    	console.log(id);
    	$http.delete('/contactlist/' + id).success(function(response){
    		refresh();
    	});
    };

    $scope.edit = function(id){
    	console.log(id);
    	$http.get('/contactlist/' + id).success(function(response){
    		$scope.contact = response;
    	});
    	//hide the Add Contact Button
	    	$scope.toggleButton = false;
	        $scope.toggleButton = !$scope.toggleButton;
	        $scope.spaces = true;
	        $scope.spaces = !$scope.spaces;
    };

    $scope.update = function(){
    	console.log($scope.contact._id);
    	$http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response){
    		refresh();
    	});

    	$scope.toggleButton = true;
	    $scope.toggleButton = !$scope.toggleButton;
	    $scope.spaces = false;
	    $scope.spaces = !$scope.spaces;
    };
});