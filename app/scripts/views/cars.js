define(['backbone','jquery','collections/cars', 'collections/searchusers' ,'views/car', 'views/searchusers'],function(Backbone, $, CarsCollection, SearchUsersCollection, CarView, SearchUserView){

	var CarsView = Backbone.View.extend({
		el : "#CarAndProductList",
		CustomerRegistrationForm : $('#CustomerRegistrationForm'),
		render : function() {
			this.collection = new CarsCollection();

			this.CustomerRegistrationForm.hide();

			var that = this;

			this.collection.fetch(
			{
		        success: function (collection, response) {
		        	that.$el.html('<h3>Car Models</h3>');
					collection.each(that.addCar, that);
		        },
		        error: function() {
		             console.log('Failed to fetch!');
		        }
		   }, this);

			this.renderUser();
		},
		renderUser: function() {
			var searchUsersCollection = new SearchUsersCollection();

			var searchUserView = new SearchUserView({ collection : searchUsersCollection });
			searchUserView.render();
		},
		addCar : function(car){
			var carView = new CarView({ model : car });
		
			this.$el.append(carView.render().el);
		}
	});

	return CarsView;
});