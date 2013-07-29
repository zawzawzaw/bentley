define(['backbone','jquery','collections/carts', 'views/finishcart', 'views/form', 'models/customer'], function(Backbone, $, cartsCollection, FinishCartView, FormView, CustomerModel){

	var CartView = Backbone.View.extend({
		tagName: 'div',
		template: _.template($('#viewcartTemplate').html()),
		events: {
			'click .deleteFromCart' : 'deleteFromCart'
		},
		render : function(){
			this.$el.append( this.template( this.model.toJSON() ) );

			$('#total span').html(this.cpuTotalAmount());

			return this;
		},
		deleteFromCart: function(e){

			// console.log(cartsCollection);
			cartsCollection.remove(this.model);

			this.$el.remove();

			$('#total span').html(this.cpuTotalAmount());

			// console.log(cartsCollection);

			// $el = $(e.currentTarget);
		},
		addCustomer: function(){
			var customerModel = new CustomerModel();
			var formView = new FormView({ model : customerModel });
			formView.render();
		},
		finishCart : function() {
			$('#container').hide();
			this.addCustomer();
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

	$('#finishCart').click(function(){
		cartView.finishCart();
	});

	return CartView;

});