define(['backbone','jquery','collections/carts', 'collections/check', 'collections/missingcat', 'views/form', 'models/customer', 'views/carts', 'views/missingcats'], function(Backbone, $, cartsCollection, CheckCollection, MissingcatCollection, FormView, CustomerModel, CartsView, MissingcatsView){

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

			if(MissingcatCollection.length>0)
				$('#finishCart').attr('disabled', 'disabled');
			else
				$('#finishCart').removeAttr('disabled');

			this.$el.append( this.template( this.model.toJSON() ) );
			this.total.html(this.cpuTotalAmount());

			return this;
		},
		deleteFromCart: function(e){

			cartsCollection.remove(this.model);
			this.$el.remove();
			this.total.html(this.cpuTotalAmount());

			this.checkmissingcat();
			this.rendermissingcat();

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

		},
		checkmissingcat : function(){
			cat_ids = CheckCollection.pluck('cat_id');
			mod_ids = CheckCollection.pluck('mod_id');
			MissingcatCollection.reset();

			for(i=0;i<cat_ids.length;i++) {

				var IfModelFoundInCart = cartsCollection.where({ mod_id: mod_ids[i] });

				if(IfModelFoundInCart.length){

					var IfCatIdNotInCart = cartsCollection.where({ cat_id: cat_ids[i] });

					if(!IfCatIdNotInCart.length){
						var missing_cat = CheckCollection.where({ cat_id: cat_ids[i] });

						MissingcatCollection.add(missing_cat);
					}
				}
			}

			return this;
		},
		rendermissingcat: function(){
			var missingcatsView = new MissingcatsView({ collection : MissingcatCollection });
			missingcatsView.render();
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