define(['backbone','models/car'],function(Backbone, Car){


	var CarCollection = Backbone.Collection.extend({
		model: Car
	});


	return CarCollection;
});