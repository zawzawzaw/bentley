define(['backbone','jquery','collections/cars', 'views/product'], function(Backbone, $, CarCollections, ProductView){
	var ProductsView = Backbone.View.extend({
		el: '#CarAndProductList',
		render : function(id) {
			this.collection = new CarCollections();

			this.$el.css('color', 'black'); // delete after design

			var that = this;

			this.collection.fetch(
			{
				data: { cat_id: id },
				processData: true,
		        success: function (collection, response) {
		        	var model_nos = (collection.pluck('model_no'));
		        	var cat_names = (collection.pluck('cat_name'));

		        	that.$el.html(' <h3>Products</h3> <h4>'+model_nos[0]+' ('+cat_names[0]+')</h4>' );
		        	collection.each(that.addProd, that);
		        },
		        error: function() {
		             console.log('Failed to fetch!');
		        }
		   }, this);
		},
		addProd : function(product) {

			var productView = new ProductView({ model : product });
			this.$el.append(productView.render().el);
			
		}
	});


	return ProductsView;
});