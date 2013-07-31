define(['backbone','jquery','collections/carts', 'views/form', 'models/customer'], function(Backbone, $, cartsCollection, FormView, CustomerModel){

	var CartView = Backbone.View.extend({
		tagName: 'div',
		template: _.template($('#viewcartTemplate').html()),
		productListing : $('#ProductListing'),
		events: {
			'click .deleteFromCart' : 'deleteFromCart'
		},
		initialize: function(){
			this.total = $('#total span');
		},
		render : function(){

			this.$el.append( this.template( this.model.toJSON() ) );
			this.total.html(this.cpuTotalAmount());
			return this;

		},
		deleteFromCart: function(e){

			cartsCollection.remove(this.model);
			this.$el.remove();
			this.total.html(this.cpuTotalAmount());

		},
		addNewCustomer: function(){

			this.productListing.hide();

			var customerModel = new CustomerModel();
			var formView = new FormView({ model : customerModel });
			formView.render();

		},
		cpuTotalAmount : function() {

			var total = 0;

			cartsCollection.each(function(cart){
				total += parseInt(cart.get('amount'));
			}, this);

			return total;

		}
	});

	var cartView = new CartView();

	$('#finishCart').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		cartView.addNewCustomer();
	});

	return CartView;

});