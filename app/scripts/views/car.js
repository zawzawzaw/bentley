define(['backbone','collections/car','views/onecar'],function(Backbone, CarCollection, OneCarView){

	var CarView = Backbone.View.extend({
		el : "body",
		render : function() {
			this.collection = new CarCollection();

			var that = this;

			this.collection.fetch(
			{
		        success: function (collection, response) {

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