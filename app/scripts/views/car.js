define(['backbone','jquery','collections/car','views/onecar'],function(Backbone, $, CarCollection, OneCarView){

	var CarView = Backbone.View.extend({
		el : "#carAndProductList",
		render : function() {
			this.collection = new CarCollection();

			var that = this;

			this.collection.fetch(
			{
		        success: function (collection, response) {
		        	that.$el.html('');
					collection.each(that.addCar, that);
		        },
		        error: function() {
		             console.log('Failed to fetch!');
		        }
		   }, this);	
		},
		addCar : function(car){
			var oneCarView = new OneCarView({ model : car });
		
			this.$el.append(oneCarView.render().el);
		}
	});

	return CarView;
});