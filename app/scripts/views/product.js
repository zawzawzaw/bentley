define(['backbone', 'views/carts'], function(Backbone, CartsView){
	var ProductView = Backbone.View.extend({
		tagName : 'div',
		template : _.template($('#productTemplate').html()),
		events: {
        	'click .addToCart': 'toggleChoosed'
	    },
	    initialize : function(){

	    	this.cartsView = new CartsView({ model : this.model });

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

			this.$el.html(this.template(this.model.toJSON()));
			return this;

		}
	});

	var productView = new ProductView();

	var doneAdding = $('#doneAdding');
	doneAdding.click(function(){
		doneAdding.hide();
		$('#finishCart').show();
		$('#total').show();

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