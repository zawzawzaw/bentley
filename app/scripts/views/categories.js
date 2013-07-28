define(['backbone','jquery','collections/car','views/category'], function(Backbone, $, CarCollection, CategoryView){
	var CategoriesView = Backbone.View.extend({
		el : '#carAndProductList',
		render : function(id) {
			this.collection = new CarCollection();

			var that = this;
			
			this.collection.fetch(
			{
				data: { mod_id: id },
    			processData: true,
		        success: function (collection, response) {
		        	that.$el.html('');
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