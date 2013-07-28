define(['backbone','jquery','collections/carts', 'views/cart'], function(Backbone, $, cartsCollection, CartView){

	var CartsView = Backbone.View.extend({
		el : '#myCartList',
		render: function(){
			var self = this;

			this.$el.html('');

			cartsCollection.each(function(cart){
				self.addOne(cart ,self)
			}, this);
		},
		addOne: function(cart){
			var cartView = new CartView({ model: cart });

			this.$el.append(cartView.render().el);
		},
		checked: function(){
			cartsCollection.add(this.model);
			 // console.log(cartsCollection.toJSON());
		},
		unchecked: function(){
			cartsCollection.remove(this.model);
			// cnsole.log(cartsCollection.toJSON());
		}
	});


	return CartsView;
});