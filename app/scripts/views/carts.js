define(['backbone','jquery','collections/carts', 'views/cart'], function(Backbone, $, cartsCollection, CartView){

	var CartsView = Backbone.View.extend({
		el : '#carAndProductList',
		render: function(){
			var self = this;

			this.$el.html('');
			this.$el.css('color', 'red' ); //remove it later

			cartsCollection.each(function(cart){
				self.addOne(cart ,self)
			}, this);
		},
		addOne: function(cart){
			var cartView = new CartView({ model: cart });

			this.$el.append(cartView.render().el);
		},
		clicked: function(){
			$('#doneAdding').show();
			cartsCollection.add(this.model);
			console.log(cartsCollection.toJSON());
			
		}
		// ,
		// unchecked: function(){
		// 	cartsCollection.remove(this.model);
		// 	// cnsole.log(cartsCollection.toJSON());
		// }
	});




	return CartsView;
});