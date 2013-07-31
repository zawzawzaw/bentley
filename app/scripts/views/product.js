define(['backbone', 'views/carts', 'collections/carts'], function(Backbone, CartsView, CartsCollection){
	var ProductView = Backbone.View.extend({
		tagName : 'div',
		template : _.template($('#productTemplate').html()),
		events: {
        	'click .addToCart': 'toggleChoosed'
	    },
	    initialize : function(){

	    	this.cartsView = new CartsView({ model : this.model });

	    	// hide when user click back button
	    	$('#finishCart').hide();
	    	$('#total').hide();

	    },	
	    toggleChoosed: function (e) {
	    	
	    	// var isChecked = e.currentTarget.checked;
	    	this.cartsView.clicked();

	    },
	    doneAdding : function(){

	    	this.cartsView.render();

	    },
		render : function(){

			var prod_ids = CartsCollection.pluck('prod_id');
			var prod_id = this.model.get('prod_id');

			this.model.set('select', '');

			for(i=0; i<prod_ids.length; i++){
				if(prod_id==prod_ids[i]) {
					this.model.set('select', 'selected');
				}
			}

			this.$el.html(this.template(this.model.toJSON()));
			return this;

		}
	});

	var productView = new ProductView();

	var doneAdding = $('#doneAdding');
	doneAdding.click(function(){
		doneAdding.hide();
		$('#finishCart').show();

		productView.doneAdding();
	});

	return ProductView;
});



// initialize : function(){
// 	var cartCollection;
// 	var cartModel;
// 	var self = this;

// 	this.cartCollection = new CartCollection();
// 	this.cartModel = new CartModel();

// 	this.cartModel.bind('change', function(){
// 		self.cartCollection.push(self.cartModel)

// 		console.log(self.cartCollection);
// 	});

// 	return this;
// },