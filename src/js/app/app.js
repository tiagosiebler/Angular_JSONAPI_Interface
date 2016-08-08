(function() {
	angular.module('taskInterface', ['Data','sidebar','mainform','ngAnimate','ngCookies'])

	.run(function($http, $httpParamSerializerJQLike,$cookieStore,$cookies,$rootScope) {		
		//don't need this for server-cookie passthru
		//$http.defaults.transformRequest.unshift($httpParamSerializerJQLike);	
		
		// look for saved state information
		$rootScope.APIpath = $cookieStore.get('APIpath');
		$rootScope.authToken = $cookieStore.get('authToken');

		if(typeof $rootScope.APIpath == 'undefined')
			$rootScope.APIpath = "http://APS-TSIEBLER-VM:10086/json-data-api";

	    $rootScope.server = {};
		$rootScope.server.taskURL = $cookieStore.get('server_taskURL');
		$rootScope.server.username = $cookieStore.get('server_username');
		$rootScope.server.project = $cookieStore.get('server_project');
		$rootScope.server.name = $cookieStore.get('server_name');
		$rootScope.server.port = $cookieStore.get('server_port');
		$rootScope.server.authmode = "1";
		
		$rootScope.report = {};
		$rootScope.report.InstanceID = $cookieStore.get('report.InstanceID');
		$rootScope.report.reportName = $cookieStore.get('report.reportName');
		
		$rootScope.cube = {};
		$rootScope.cube.ID = $cookieStore.get('cube.cubeID');
		$rootScope.cube.InstanceID = $cookieStore.get('cube.InstanceID');

		$rootScope.object = {};

		if(typeof $rootScope.server.taskURL == 'undefined'){
			$rootScope.server.taskURL = "http://APS-TSIEBLER-VM:10086/json-data-api";
			$rootScope.server.username = "Administrator";
			$rootScope.server.project = "MicroStrategy Tutorial";
			$rootScope.server.name = "APS-TSIEBLER-VM";
			$rootScope.server.port = "34952";
			$rootScope.server.authmode = "1";
		}
		$rootScope.doReset = function (){
			var cookies = $cookies.getAll();
			for (var i in cookies) {
				$cookies.remove(i);
			}
			for (var prop in $rootScope) {
			    if (prop.substring(0,1) !== '$') {
			        delete $rootScope[prop];
			    }
			}
			
			// not the cleanest way...
			window.location="./";
		}
		
	});
	
})();