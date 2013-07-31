define(['backbone','jquery','collections/carts', 'views/cart'], function(Backbone, $, cartsCollection, CartView){

	var CartsView = Backbone.View.extend({
		el : '#CarAndProductList',
		doneAddingButton : $('#doneAdding'),
		render: function(){

			var self = this;

			this.$el.html('');

			this.$el.append('<h3 id="cartPreview">Your Cart</h3>');
			this.$el.append('<h3 id="total">Total: <span>0</span></h3>');

			cartsCollection.each(function(cart){
				self.addOne(cart, self)
			}, this);		
		},
		addOne: function(cart){
			
			var cartView = new CartView({ model: cart });

			$('#total').before(cartView.render().el);
		},
		clicked: function(){

			this.doneAddingButton.show();
			var count = cartsCollection.where({ prod_id: this.model.get('prod_id') });
			if(!count.length) {
				cartsCollection.add(this.model);
				this.model.set('select', 'selected');
				// console.log(this.model);
			}
		}
	});

	return CartsView;
});