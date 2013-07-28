define(['backbone','jquery','collections/carts', 'views/savecart'], function(Backbone, $, cartsCollection, SaveCartView){

	var CartView = Backbone.View.extend({
		tagName: 'div',
		template: _.template($('#viewcartTemplate').html()),
		events: {
			'click .deleteFromCart' : 'deleteFromCart'
		},
		render : function(){
			this.$el.append( this.template( this.model.toJSON() ) );

			$('#total span').html(this.cpuTotalAmount());
			console.log(this.cpuTotalAmount());

			return this;
		},
		deleteFromCart: function(e){

			// console.log(cartsCollection);
			cartsCollection.remove(this.model);

			this.$el.remove();

			// console.log(cartsCollection);

			// $el = $(e.currentTarget);
		},
		saveCart : function() {
			var total = 0;

			cartsCollection.each(function(cart){
				var saveCartView = new SaveCartView({ model : cart });


				total += parseInt(cart.get('amount'));
				console.log(total);
			}, this);
		},
		cpuTotalAmount : function() {
			var total = 0;

			cartsCollection.each(function(cart){

				total += parseInt(cart.get('amount'));
				//console.log(total);

			}, this);

			return total;
		}
	});

	var cartView = new CartView();

	$('#saveCart').click(function(){
		cartView.saveCart();
	});

	return CartView;

});