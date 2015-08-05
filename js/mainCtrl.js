var app = angular.module('chatroom');

app.controller('mainCtrl', function ($scope, parseService, $http) {
	//In your controller you'll have a getParseData function and a postData function, but should be placed on $scope.

	$scope.postData = function () {
		parseService.postData($scope.message)
			.success(function () {
				$scope.message = '';
			})
	}

	$scope.dropABomb = parseService.dropABomb

	$scope.deleteEntry = function (entryId) {
		parseService.deleteEntry(entryId)
			.success(function () {
				populateScope();
			})
	}

	$http.get('https://api.parse.com/1/classes/chat?order=-createdAt')
		.then(function (data) {
			console.log(data.data.results.length)
		})

	//The getParseData function will call the getData method on the parseService object. You'll then save the result of that request to
	//your controllers $scope as messages ($scope.messages)



	//The postData function will take whatever the user typed in (hint: look at the html and see what ng-model correlates to on the input box),
	//pass that text to the postData method on the parseService object which will then post it to the parse backend.


	function populateScope() {
		parseService.getData()
			.success(function (data, status, headers, config) {
				$scope.messages = data;
			})
	}

	//uncomment this code when your getParseData function is finished
	//This goes and gets new data every second, which mimicking a chat room experience.
	populateScope();

	// setInterval(function () {
	// 	populateScope();
	// }, 1500)
})
