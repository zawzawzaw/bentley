define(['backbone','jquery','collections/carts', 'views/cart'], function(Backbone, $, cartsCollection, CartView){

	var CartsView = Backbone.View.extend({
		el : '#carAndProductList',
		doneAddingButton : $('#doneAdding'),
		render: function(){

			var self = this;

			this.$el.html('');
			this.$el.css('color', 'red' ); //remove it later

			cartsCollection.each(function(cart){
				self.addOne(cart, self)
			}, this);
			
		},
		addOne: function(cart){
			
			var cartView = new CartView({ model: cart });
			this.$el.append(cartView.render().el);

		},
		clicked: function(){

			this.doneAddingButton.show();
			var count = cartsCollection.where({ prod_id: this.model.get('prod_id') });
			if(!count.length) {
				cartsCollection.add(this.model);
				this.model.set('select', 'selected');
				console.log(this.model);
			}
			console.log(cartsCollection.toJSON());

		}
	});

	return CartsView;
});