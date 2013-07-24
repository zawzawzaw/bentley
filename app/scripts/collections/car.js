define(['backbone'],function(Backbone){


	var CarCollection = Backbone.Collection.extend({
		model: Car
	});


	return CarCollection;
});