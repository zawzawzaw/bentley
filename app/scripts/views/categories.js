define(['backbone','collections/car'], function(Backbone, CarCollection){
	var CategoriesView = Backbone.View.extend({
		el : 'body',
		render : function(id) {
			this.collection = new CarCollection();

			var that = this;

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
			console.log(category);
		}
	});


	return CategoriesView;
});