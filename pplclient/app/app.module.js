var pplApp = angular.module('pplApp', ['ngRoute']);

pplApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl : 'app/pages/main.html',
        controller  : 'mainController'
    })
    .when('/papers', {
        templateUrl : 'app/pages/papers.html',
        controller  : 'paperController'
    });
}]);

pplApp.controller('mainController', function ($scope, $http){
	$scope.message = 'Everyone come and see how good I look!';
});

pplApp.controller('paperController', function($scope, $http) {
    $scope.message = 'Look! I am an about page.';
    $scope.papers = 
		[
			{name: "test1"},
			{name: "test2"},
			{name: "test3"},
			{name: "test4"},
		];

	// $http.get('countries.json').success(function(data) {
	// 	$scope.countries = data;
	// });
});