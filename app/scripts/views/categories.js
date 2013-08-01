define(['backbone','jquery','collections/cars', 'collections/check','views/category', 'views/searchusers'], function(Backbone, $, CarsCollection, CheckCollection, CategoryView, SearchUserView){
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


			var searchUserView = new SearchUserView();
			console.log(searchUserView);

		},
		addCategory: function(category){

			var IfFound = CheckCollection.where({ cat_id: category.get('cat_id') });

			if(!IfFound.length){
				CheckCollection.add(category);
			}	

			var categoryView = new CategoryView({ model: category });
			this.$el.append(categoryView.render().el);

		}
	});

	return CategoriesView;
});