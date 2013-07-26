define(['backbone', 'views/cart'], function(Backbone, CartView){
	var ProductView = Backbone.View.extend({
		tagName : 'div',
		template : _.template($('#productTemplate').html()),
		events: {
        	'click .toggle': 'toggleChoosed'
	    },
	    toggleChoosed: function (e) {
	        // alert(e.currentTarget.name);

	        var cartView = new CartView({ model : this.model });	    	
	    },
		render : function(){
			this.$el.html(this.template(this.model.toJSON()));

			return this;
		}
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