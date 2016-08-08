(function() {
    angular.module('requestSrv', ['Data', 'ngCookies'])
	.factory("requestSrv", ['Data', '$rootScope', '$cookieStore',
		function (Data, $rootScope, $cookieStore) {
			
			
			var timestamp = new Date().getTime();
			timestamp = '?&i='+timestamp;
			
		    var obj = {};
			obj.session = {};
		    obj.session.login = function (jsonAPIPath, iserver, port, project, username, password, authmode) {
				var parameters = encodeURI("");
				var headers = {};
				var postBody = {};
				headers["Content-Type"] = "application/json";
				headers["Accept"] = "application/vnd.mstr.dataapi.v0+json";
				headers["X-IServerName"] = iserver;
				headers["X-Port"] = port;
				headers["X-ProjectName"] = project;
				headers["X-Username"] = username;
				headers["X-AuthMode"] = authmode;
				
				if(typeof(password) != 'undefined'){
					headers["X-Password"] = password;
				}else{
					console.log("Sending request without password");
				}
				var url = jsonAPIPath + "/" + "sessions" + "/" + parameters;
				
				return Data.post(url, postBody, headers).catch(function(e){
					console.log("POST failure");
					console.log(e);
				})
				.catch(function (e){
				})
				.then(function (results) {
					//console.log("get: " + JSON.stringify(results.data));
					return results;
				});
		    };
		    obj.session.logout = function (jsonAPIPath, authToken) {
				//debugger
				var parameters = encodeURI("");

				var headers = {};
				var postBody = {};
				
				headers["Content-Type"] = "application/json";
				headers["Accept"] = "application/vnd.mstr.dataapi.v0+json";
				headers["X-MSTR-AuthToken"] = authToken;

				var url = jsonAPIPath + "/" + "sessions" + "/" + parameters;
				
				return Data.delete(url, headers).catch(function(e){
					console.log("DELETE failure");
					console.log(e);
					if(typeof e.status != "undefined"){
						if(e.status == 404){
							console.log("404 error on logout, session must be not found");
							delete $rootScope.authToken;
							$cookieStore.remove('authToken');
						}
					}
					Data.handleError(e);
				}).then(function (results) {
					//console.log("get: " + JSON.stringify(results.data));
					
					if(typeof results != "undefined" && typeof results.data != "undefined" && results.data){
			            return results.data;
					}
					else return results;
				});
		    };

			obj.report = {};
		    obj.report.instanceCreate = function (jsonAPIPath, authToken, reportID, offset, limit) {
				//debugger
				if(typeof offset == 'undefined') offset = 0;
				if(typeof limit == 'undefined') limit = 1000;
				
				var parameters = encodeURI("/?offset="+offset+"&limit="+limit);

				var headers = {};
				var postBody = {};
				headers["Content-Type"] = "application/vnd.mstr.dataapi.v0+json";
				headers["Accept"] = "application/vnd.mstr.dataapi.v0+json";
				headers["X-MSTR-AuthToken"] = authToken;

				var url = jsonAPIPath + "/" + "reports" + "/" + reportID + "/instances" + parameters;

				return Data.post(url, postBody, headers).catch(function(e){
					console.log("POST failure");
					console.log(e);
				}).then(function (results) {
					//if(results.status == 200){
						//all good, execution successful
						//}					
					if(typeof results != "undefined" && typeof results.data != "undefined" && results.data){
			            return results.data;
					}
					else return results;
				});
		    };
		    obj.report.instanceGet = function (jsonAPIPath, authToken, reportID, instanceID, offset, limit) {
				//debugger
				if(typeof offset == 'undefined') offset = 0;
				if(typeof limit == 'undefined') limit = 1000;
				
				var parameters = encodeURI("/?offset="+offset+"&limit="+limit);

				var headers = {};
				var postBody = {};
				headers["Accept"] = "application/vnd.mstr.dataapi.v0+json";
				headers["X-MSTR-AuthToken"] = authToken;

				var url = jsonAPIPath + "/" + "reports" + "/" + reportID + "/instances/" + instanceID;
				
				return Data.get(url, headers, parameters).catch(function(e){
					console.log("GET failure");
					console.log(e);
				}).then(function (results) {
					//if(results.status == 200){
						//all good, execution successful
						//}					
					if(typeof results != "undefined" && typeof results.data != "undefined" && results.data){
			            return results.data;
					}
					else return results;
				});
		    };
			
			//could probably combine these with the above functions into a much more concise way...later...
		    obj.cube = {};
			obj.cube.instanceCreate = function (jsonAPIPath, authToken, cubeID, offset, limit) {
				//debugger
				if(typeof offset == 'undefined') offset = 0;
				if(typeof limit == 'undefined') limit = 1000;
				
				var parameters = encodeURI("/?offset="+offset+"&limit="+limit);

				var headers = {};
				var postBody = {};
				headers["Content-Type"] = "application/vnd.mstr.dataapi.v0+json";
				headers["Accept"] = "application/vnd.mstr.dataapi.v0+json";
				headers["X-MSTR-AuthToken"] = authToken;

				var url = jsonAPIPath + "/" + "cubes" + "/" + cubeID + "/instances" + parameters;

				return Data.post(url, postBody, headers).catch(function(e){
					console.log("POST failure");
					console.log(e);
				}).then(function (results) {
					//if(results.status == 200){
						//all good, execution successful
						//}					
					if(typeof results != "undefined" && typeof results.data != "undefined" && results.data){
			            return results.data;
					}
					else return results;
				});
		    };
		    obj.cube.instanceGet = function (jsonAPIPath, authToken, cubeID, instanceID, offset, limit) {
				//debugger
				if(typeof offset == 'undefined') offset = 0;
				if(typeof limit == 'undefined') limit = 1000;
				
				var parameters = encodeURI("/?offset="+offset+"&limit="+limit);

				var headers = {};
				var postBody = {};
				headers["Accept"] = "application/vnd.mstr.dataapi.v0+json";
				headers["X-MSTR-AuthToken"] = authToken;

				var url = jsonAPIPath + "/" + "cubes" + "/" + cubeID + "/instances/" + instanceID;
				
				return Data.get(url, headers, parameters).catch(function(e){
					console.log("GET failure");
					console.log(e);
				}).then(function (results) {
					//if(results.status == 200){
						//all good, execution successful
						//}					
					if(typeof results != "undefined" && typeof results.data != "undefined" && results.data){
			            return results.data;
					}
					else return results;
				});
		    };
		    return obj;
		}
	])
	
})();