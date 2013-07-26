define(['backbone', 'models/cart'],function(Backbone, Cart){
	var CartsCollection = Backbone.Collection.extend({
		idAttribute: 'prod_id',
		model : Cart
	});

	var cartsCollection = new CartsCollection();

	return cartsCollection;
});