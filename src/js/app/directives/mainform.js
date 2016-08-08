(function() {
    angular.module('mainform', ['requestSrv', 'ngCookies', 'ngJsonExplorer'])

    // directives make HTML easier, pull in subfiles without much effort.
    // <product-title></>
    .directive('mainform', function() {
        return {
            restrict: 'E',
            templateUrl: 'partials/mainform.html',
			link: function (scope, element, attrs) {

				
				
			},
			controller: ['$scope','requestSrv','$rootScope', '$cookies','$cookieStore', function($scope, requestSrv, $rootScope, $cookies, $cookieStore) {	
				
				$scope.fullscreen = function (e) {
			        e.preventDefault();

			        var $this = e.currentTarget;

					var i = $this.getElementsByTagName('i')[0].classList;
			
					//if panel, this should be .panel. Add if logic here so this is automated.
					var thumb = $this.closest('.thumbnail');
			
					// setting to fullscreen
					if (i.contains('glyphicon-resize-full')){
						i.remove('glyphicon-resize-full');
			            i.add('glyphicon-resize-small');
				
						thumb.classList.add('panel-fullscreen');
					}
					// setting to small again
					else if(i.contains('glyphicon-resize-small')){
						
			            i.remove('glyphicon-resize-small');
						i.add('glyphicon-resize-full');
				
						thumb.classList.remove('panel-fullscreen');
					}
				    $scope.$emit('fullscreen_toggle', []);
				};
				
			    
			}],
			controllerAs: 'mainformCtrl'
        };
    });
})();