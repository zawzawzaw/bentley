define(['backbone','collections/car', 'views/product'], function(Backbone, CarCollection, ProductView){
	var ProductsView = Backbone.View.extend({
		el: 'body',
		render : function(id) {
			this.collection = new CarCollection();

			var that = this;

			this.collection.fetch(
			{
				data: { cat_id: id },
				processData: true,
		        success: function (collection, response) {
		        	that.$el.html('');
					collection.each(that.addProd, that);
		        },
		        error: function() {
		             console.log('Failed to fetch!');
		        }
		   }, this);
		},
		addProd : function(product) {	

			var productView = new ProductView({ model : product });

			this.$el.append(productView.render('something').el);
		}
	});


	return ProductsView;
});