define(['backbone','collections/car'],function(Backbone, CarCollection){

	var CarView = Backbone.View.extend({
		initialize : function() {

			this.collection = new CarCollection({ 'test' : 'test'});

			console.log( this.collection.toJSON() );
		}
	});

	return CarView;
});