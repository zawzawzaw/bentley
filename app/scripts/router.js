define(['jquery','underscore','backbone','views/car'], function($, _, Backbone, CarView){
	var AppRouter = Backbone.Router.extend({ 
		routes : {
			'' : 'showCars',
			'show/:id' : 'show',
			'download/:id/*filename' : 'download',
			'search/:query': 'search',
			'*other' : 'default'
		},
		showCars : function() {
			var carView = new CarView();
		},
	}); 

	var initialize = function(){
		var app_router = new AppRouter;
		
		Backbone.history.start(); 
	}; 

	return { initialize: initialize };
});