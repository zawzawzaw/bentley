define(['jquery','underscore','backbone','views/car','views/categories'], function($, _, Backbone, CarView, CategoriesView){
	var AppRouter = Backbone.Router.extend({ 
		routes : {
			'' : 'showCarModels',
			'showcar/:id' : 'showCategories',
			'download/:id/*filename' : 'download',
			'search/:query': 'search',
			'*other' : 'default'
		},
		showCarModels : function() {
			var carView = new CarView();
			carView.render();
		},
		showCategories : function(id){
			var categoriesView = new CategoriesView();
			categoriesView.render(1);
		},
		download : function(id, filename) {
			console.log(id + filename);
		},
		search : function(search){
			console.log('what you searching for '+ search);
		},
		default : function(other) {
			alert('no idea what you searching for: '+other)
		}
	}); 

	var initialize = function(){
		var app_router = new AppRouter;
		
		Backbone.history.start(); 
	}; 

	return { initialize: initialize };
});