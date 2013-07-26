define(['backbone'], function(Backbone){
	var Car = Backbone.Model.extend({
		defaults: {
			chosen: 'no'
		}
	});


	return Car;
});