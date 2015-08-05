var app = angular.module('chatroom');

app.service('parseService', function ($http) {
	//Here you'll need to create two methods. One called postData and the other called getData.

	//On the lines below create a getData method. This method will retrieve data from the parse backend.
	//The url for the get request should be 'https://api.parse.com/1/classes/chat?order=-createdAt'
	//Be sure to return whatever gets returned from $http so you can call .then in your controller.

	var droppingABomb = {
		bombsAway: function () {
			console.log("Dropping a bomb.");
			setTimeout(function(){
			$http.get('https://api.parse.com/1/classes/chat?order=-createdAt')
				.success(function(data){
					droppingABomb.continueBombing(data);
				})
			},7000)
		},
		continueBombing: function (data) {
			for (var i = 0; i < data.results.length; i++) {
				$http.delete('https://api.parse.com/1/classes/chat/' + data.results[i].objectId)
			}
			if (data.results.length > 10) {
				console.log("Bomb dropped.");
				droppingABomb.bombsAway();
				return;
			}
		}
	}

	this.dropABomb = droppingABomb.bombsAway;

	this.getData = function () {

		$http.get('https://api.parse.com/1/classes/chat?order=-createdAt')
			.success(function (data) {
				for (var i = 0; i < data.results.length; i++) {

					if (data.results[i].hasOwnProperty('text')) {
						if (checkMessage(data.results[i].text.toLowerCase())) {
							$http.delete('https://api.parse.com/1/classes/chat/' + data.results[i].objectId)
							console.log("deleted", data.results[i]);
						}
					} else {
						$http.delete('https://api.parse.com/1/classes/chat/' + data.results[i].objectId)
						console.log("deleted", data.results[i]);

					}
				}
			});

		return $http.get('https://api.parse.com/1/classes/chat?order=-createdAt')
	}

	function checkMessage(messageText) {

		if (!messageText) {
			return true;
		}
		if (messageText.includes("obama")) {
			return true;
		}
		if (messageText.includes("test")) {
			return true;
		}
		if (messageText.includes("asdf")) {
			return true;
		}
		if (messageText.includes("/")) {
			return true;
		}
		if (messageText === ' ') {
			return true;
		}

		return false;
	}

	this.deleteEntry = function (entryId) {
		return $http.delete('https://api.parse.com/1/classes/chat/' + entryId)
	}

	this.postData = function (newMessage) {

		// $http.delete('https://api.parse.com/1/classes/chat/m13n6Go9ME')
		//     .success(function(){
		//         console.log("Successfully deleted data.");
		//     })
		//     .error(function(){
		//         console.log("Error deleting data.");
		//     })

		return $http.post('https://api.parse.com/1/classes/chat', {
			text: newMessage
		})
	}

	//On the line below create the postData method. This method will add data to the parse backend.
	//The url for the request needs to be 'https://api.parse.com/1/classes/chat'
	//Because we're making a POST request, we need a way to tell parse the data we want to give it,
	//in your $http call (along with url and method) have a data property which has a value that is equal to another object which a key of text and a value of the message being passed to parse. IE data: {text: yourMessage}
	//Also, remember that $http returns a promise. So if you return the whole $http call (return $http(...)), you can then use .then in your controller.

	//postData method here


	//getData method here
});
