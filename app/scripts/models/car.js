define(['backbone'], function(Backbone){
	var Car = Backbone.Model.extend({
		defaults: {
			customer_id : ''
		}
	});


	return Car;
});