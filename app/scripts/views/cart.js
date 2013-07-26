define(['backbone', 'collections/carts'], function(Backbone, CartsCollection){

	var CartView = Backbone.View.extend({
		initialize: function(){
			
			cartsCollection = new CartsCollection();

			console.log(this.model);
			console.log(cartsCollection);


			cartsCollection.add(this.model);

			console.log(cartsCollection);
		}
	});


	return CartView;
});