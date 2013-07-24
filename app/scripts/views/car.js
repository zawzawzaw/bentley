define(['backbone','models/car'],function(Backbone, CarModel){

	var CarView = Backbone.View.extend({
		initialize : function() {

			this.model = new CarModel();

			console.log( this.model.toJSON() );
		}
	});

	return CarView;
});