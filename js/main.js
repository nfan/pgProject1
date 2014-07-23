require.config({
	baseUrl: 'js',
	paths: {
        'jquery': 'libs/jquery/jquery-1.10.1',
        'jqueryui': 'libs/jquery/jquery-ui-1.10.3.custom',
        'jqueryuiTouch': 'libs/jquery/jquery.ui.touch-punch',
		'jqueryMobile': 'libs/jquery/jquery.mobile-1.3.1',
		'underscore': 'libs/underscore/underscore',
		'Backbone': 'libs/backbone/backbone',
		'json': 'libs/json/json2',
		'domReady': 'libs/require/domReady',
        'text': 'libs/require/text',
        'bootstrap': 'libs/bootstrap/bootstrap'
	},
	shim: {
		Backbone:{
            deps:['underscore', 'jquery'],
            exports:'Backbone'
        },
        underscore:{
            exports:'_'
        },
        bootstrap: {
            deps:['jquery']
        }
    }
});

require(['Backbone', 'jquery', 'domReady'],
        function(Backbone, $, domReady) {
        
                function launchApp() {
        
                    //UPGRADE: var upgrador = new app_upgrade();
                    //UPGRADE: upgrador.check(upgraded);
                    require(['lunch'], function(lunch) {
                        var app = new lunch();
						$("body").append(app.render().el);
                    });
                }
        
                domReady(function() {
                         if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
                            document.addEventListener("deviceready", launchApp, false);
                         } else {
                            launchApp(); //this is the browser
                         }
                });
        }
);
