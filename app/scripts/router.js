define(['jquery','underscore','backbone','views/car','views/categories', 'views/products'], function($, _, Backbone, CarView, CategoriesView, ProductsView){
	var AppRouter = Backbone.Router.extend({ 
		routes : {
			'' : 'showCarModels',
			'showcategories/:id' : 'showCategories',
			'showproducts/:id' : 'showProducts',
			'search/:query': 'search',
			'*other' : 'default'
		},
		showCarModels : function() {
			var carView = new CarView();
			carView.render();
		},
		showCategories : function(id){
			var categoriesView = new CategoriesView();
			categoriesView.render(id);
		},
		showProducts : function(id) {
			var productsView = new ProductsView();
			productsView.render(id);
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

		$.fn.serializeObject = function()
	    {
	        var o = {};
	        var a = this.serializeArray();
	        $.each(a, function() {
	            if (o[this.name] !== undefined) {
	                if (!o[this.name].push) {
	                    o[this.name] = [o[this.name]];
	                }
	                o[this.name].push(this.value || '');
	            } else {
	                o[this.name] = this.value || '';
	            }
	        });
	        return o;
	    };
	}; 

	return { initialize: initialize };
});