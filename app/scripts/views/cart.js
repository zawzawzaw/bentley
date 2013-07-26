define(['backbone', 'collections/carts'], function(Backbone, cartsCollection){

	var CartView = Backbone.View.extend({
		template: _.template($('#viewcartTemplate').html()),
		initialize: function(){
			
			// var cartsModel = new CartsModel();

			// cartsModel.set(this.model);

			cartsCollection.add(this.model);

			var self = this;

			cartsCollection.each(function(cart){
				this.$el.html( self.template(cart.toJSON() ) );
			}, this);

			console.log(this.el);

			console.log(cartsCollection.toJSON());
		},
		render : function(){

		}
	});


	return CartView;
});