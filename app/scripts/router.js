define(['jquery','underscore','backbone','views/form','views/cars','views/categories', 'views/products'], function($, _, Backbone, FormView, CarsView, CategoriesView, ProductsView){
	var AppRouter = Backbone.Router.extend({ 
		routes : {
			'' : 'customerForm',
			'showcarmodels' : 'showCarModels',
			'showcategories/:id' : 'showCategories',
			'showproducts/:id' : 'showProducts',
			'search/:query': 'search',
			'*other' : 'default'
		},
		customerForm : function(){
			var formView = new FormView({ router : AppRouter });
			formView.render();
		},
		showCarModels : function() {
			var carsView = new CarsView();
			carsView.render();
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
	}; 

	return { initialize: initialize };
});