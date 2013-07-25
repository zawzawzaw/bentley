define(['backbone'], function(Backbone){
	var Car = Backbone.Model.extend({
		defaults : { 
			"mod_id":"1", 
			"model_no" : "GT V8"
		}
	});


	return Car;
});