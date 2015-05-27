var app = angular.module("firstApp", []);

app.controller("firstController", function($scope, $http, sendGetReq, addUserData, getDataById){
	var myAppThis = this;
	
	$scope.getData = function(){
		var requestParam = {
			url: "/getData",
			params: {
				action: "get"
			}
		};
		var request = sendGetReq.init(requestParam);
		request.then( function(data){
			myAppThis.rows = data.data;
		}, function(a,b,c){
			
		});
	};
	$scope.getData();

	$scope.addFriend = function(){
		var requestParam = {
			url: "/addUser",
			inputData: {
				"name": $scope.name,
				"city": $scope.city,
				"designation": $scope.designation
			}
		};
		var request = addUserData.init(requestParam);
		request.then( function(data){
			alert('data added successfully...');
			$scope.getData();
			//$scope.add-data.reset();			
		}, function(a,b,c){
			alert('error while add new data');
			//$scope.add-data.reset();
		});
	};

	$scope.openEditView = function(id){
		console.log(id);
		var requestParam = {
			url: "/getDataById",
			inputData: {
				"id": id
			}
		};
		var request = getDataById.init(requestParam);
		request.then(function(data){
			debugger;
			$scope.name = data[0].name;
			$scope.city = data[0].city;
			$scope.designation = data[0].designation;
		}, function(){

		});
	};
	
}).service('sendGetReq', function($http, $q) { 
	return { 
		init: function(requestParam){ 
			var request = $http({
		        method: "GET",
		        url:  requestParam.url,
		        params: requestParam.params
		    });
			return request;
		}
	}
}).service('addUserData', function($http){
	return {
		init: function(requestParam){
			var request = $http({
				method: "POST",
				url: requestParam.url,
				data: requestParam.inputData
			});
			return request;
		}
	}
}).service('getDataById', function($http){
	return {
		init: function(requestParam){
			var request = $http({
				method: "POST",
				url: requestParam.url,
				data: requestParam.inputData
			});
			return request;
		}
	}
});
