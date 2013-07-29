define(['backbone', 'models/cart'],function(Backbone, CartModel){
	var CartsCollection = Backbone.Collection.extend({
		idAttribute: 'prod_id',
		model : CartModel
	});

	var cartsCollection = new CartsCollection();

	return cartsCollection;
});