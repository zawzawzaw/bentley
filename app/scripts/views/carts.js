define(['backbone','jquery','collections/carts', 'collections/check', 'collections/missingcat', 'views/cart', 'views/missingcats'], function(Backbone, $, cartsCollection, CheckCollection, MissingcatCollection, CartView, MissingcatsView){

	var CartsView = Backbone.View.extend({
		el : '#CarAndProductList',
		doneAddingButton : $('#doneAdding'),
		render: function(){

			this.checkmissingcat();
			this.rendermissingcat();

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

	return CartsView;
});