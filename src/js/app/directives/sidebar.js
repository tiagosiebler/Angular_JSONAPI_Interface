(function() {
    angular.module('sidebar', ['Data','requestSrv', 'ngCookies', 'ui.bootstrap'])

    // directives make HTML easier, pull in subfiles without much effort.
    // <product-title></>
    .directive('sidebar', function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/sidebar.html',
			link: function (scope, element, attrs) {

				
				
			},
			controller: ['$scope','requestSrv','$rootScope', '$cookieStore', '$cookies', function($scope, requestSrv, $rootScope, $cookieStore, $cookies) {				

				
			    $scope.doLogin = function (form) {
					
					var request = requestSrv.session.login(
						$scope.server.taskURL, 
						$scope.server.name, 
						$scope.server.port, 
						$scope.server.project, 
						$scope.server.username, 
						$scope.server.password, 
						$scope.server.authmode)
						.catch(function(e){
							debugger;
							console.log("login failure",e);
						}).then(function (results) {
							if(typeof results != 'undefined'){
								switch(results.status){
									case 500: 
										console.log("Status 500: " + results.message + " : " + results.cause);
										
										break;
										
									case 201:
										console.log("Success");
										
										$rootScope.authToken = results.data.authToken;
										$rootScope.APIpath = $scope.server.taskURL;
										
										$cookieStore.put('authToken',$rootScope.authToken);
										$cookieStore.put('APIpath',$rootScope.APIpath);
										
										console.log("Auth Token: "+results.data.authToken);
										
										break;
									default:
										console.log("unhandled status: ", results);
								}
								console.log("login: ", results);
							}
						});
				};
			    $scope.doLogout = function (form) {
					var request = requestSrv.session.logout(
						$scope.server.taskURL, 
						$rootScope.authToken)
						.catch(function(e){
							console.log("logout failure",e);
							//debugger;
							
						}).then(function (results) {
							if(typeof results != 'undefined' && results.status == 204){
								console.log("Logout successful");
								
								delete $rootScope.authToken;
								$cookieStore.remove('authToken');
							}
							console.log("logout: ",results);
					});
				};
				
				/* report execution */
				$scope.reportID = "913F458647C9BB1627623E90A53D9009";//supplier sales report (shared -> subject areas -> supplier analysis)
				$scope.reportExecuting = false;				
				
				var offset = 0;
				var limit = 100;
				
				$scope.syncParams = function(){
					$rootScope.object.offset = offset;
					$rootScope.object.limit = limit;
				}
			    $scope.createReportInstance = function () {
					//jsonAPIPath, authToken, reportID, offset, limit
					$scope.reportExecuting = true;
					
					if(typeof($scope.report.offset) != 'undefined')
						offset = $scope.report.offset;
					
					if(typeof($scope.report.limit) != 'undefined')
						limit = $scope.report.limit;
					
					$scope.syncParams();
					
					requestSrv.report.instanceCreate($rootScope.APIpath, $rootScope.authToken, $scope.reportID, offset, limit)
					.catch(function(e){
						console.log("failure to create instance for report ",e);
					}).then(function (results) {
						$scope.reportExecuting = false;
						if(typeof results != 'undefined'){
							$rootScope.report.InstanceID = results.instanceId;
							$cookieStore.put('report.InstanceID',$rootScope.report.InstanceID);
							
							$rootScope.report.ID = $scope.reportID;
							$cookieStore.put('report.ID',$rootScope.report.ID);
							
							$rootScope.report.reportName = results.name;
							$rootScope.object.name = results.name;
							$rootScope.object.type = 'Report';
							
							$cookieStore.put('report.reportName',$rootScope.report.reportName);
							
							console.log("createInstance: ", results);
						}
					});
				};
				// when making call to use report instance ID, if error because ID expired, remove Id from cookie and rootScope
				
				$scope.getReportInstance = function(){
					//$rootScope.report.InstanceID
					$scope.reportExecuting = true;
					
					if(typeof($scope.report.offset) != 'undefined')
						offset = $scope.report.offset;
					
					if(typeof($scope.report.limit) != 'undefined')
						limit = $scope.report.limit;
					
					$scope.syncParams();
					
					requestSrv.report.instanceGet($rootScope.APIpath, $rootScope.authToken, $scope.reportID, $rootScope.report.InstanceID, offset, limit)
					.catch(function(e){
						console.log("failure to get instance of report ",e);
					}).then(function (results) {
						$scope.reportExecuting = false;
													
						if(typeof results != 'undefined'){
							$rootScope.resultJSON = results;
							
							$rootScope.object.name = results.name;
							$rootScope.object.type = 'Report';
							
							console.log("Saving results to scope");
							
							console.log("getInstance: ", results);
						}
					});
				};
				
				// CUBE API
				$rootScope.cube.ID = "1501C7F44AEFE6B66FE1BDB1954EF12D";//All Project Languages (Tutorial -> Public Objects -> MicroStrategy Platform Capabilities -> MSTR OLAP Services -> Intelligent Cubes and View Reports)
				$scope.cubeExecuting = false;
				
			    $scope.createCubeInstance = function () {
					//jsonAPIPath, authToken, reportID, offset, limit
					$scope.cubeExecuting = true;
					
					if(typeof($scope.cube.offset) != 'undefined')
						offset = $scope.cube.offset;
					
					if(typeof($scope.cube.limit) != 'undefined')
						limit = $scope.cube.limit;
					
					$scope.syncParams();
					
					requestSrv.cube.instanceCreate($rootScope.APIpath, $rootScope.authToken, $scope.cube.ID, offset, limit)
					.catch(function(e){
						console.log("failure to create instance for cube ",e);
					}).then(function (results) {
						$scope.cubeExecuting = false;
						if(typeof results != 'undefined'){
							$rootScope.cube.InstanceID = results.instanceId;
							$cookieStore.put('cube.InstanceID',$rootScope.cube.InstanceID);
							
							$cookieStore.put('cube.ID',$rootScope.cube.ID);
							
							$rootScope.cube.cubeName = results.name;
							$rootScope.object.name = results.name;
							$rootScope.object.type = 'Cube';
							$cookieStore.put('cube.cubeName',$rootScope.cube.cubeName);
							
							console.log("createInstance: ", results);
						}
					});
				};
				$scope.getCubeInstance = function(){
					$scope.cubeExecuting = true;
					
					if(typeof($scope.cube.offset) != 'undefined')
						offset = $scope.cube.offset;
					
					if(typeof($scope.cube.limit) != 'undefined')
						limit = $scope.cube.limit;
					
					$scope.syncParams();
					
					requestSrv.cube.instanceGet($rootScope.APIpath, $rootScope.authToken, $scope.cube.ID, $rootScope.cube.InstanceID, offset, limit)
					.catch(function(e){
						console.log("failure to get instance of cube ",e);
					}).then(function (results) {
						$scope.cubeExecuting = false;
													
						if(typeof results != 'undefined'){
							$rootScope.resultJSON = results;
							$rootScope.object.name = results.name;
							$rootScope.object.type = 'Cube';
							
							console.log("Saving results to scope");
							
							console.log("getInstance: ", results);
						}
					});
				};
				
				
			}],
			controllerAs: 'sidebarCtrl'
        };
    });
})();