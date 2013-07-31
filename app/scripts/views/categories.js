define(['backbone','jquery','collections/cars','views/category'], function(Backbone, $, CarsCollection, CategoryView){
	var CategoriesView = Backbone.View.extend({
		el : '#CarAndProductList',
		render : function(id) {

			this.collection = new CarsCollection();

			var that = this;
			that.$el.html('<h3>Categoires</h3>');
			
			this.collection.fetch(
			{
				data: { mod_id: id },
    			processData: true,
		        success: function (collection, response) {
		        	
					collection.each(that.addCategory, that);
		        },
		        error: function() {
		             console.log('Failed to fetch!');
		        }
		   }, this);

		},
		addCategory: function(category){

			var categoryView = new CategoryView({ model: category });
			this.$el.append(categoryView.render().el);

		}
	});

	return CategoriesView;
});