define(['backbone'], function(Backbone){
	var Car = Backbone.Model.extend({
		defaults : { 
			"mod_id":"1", 
			"model_no" : "GT V8", 
			"cat_id":"1", 
			"cat_name" : "wheel & tyre", 
			"prod_id" : "1",
			"prod_name" : "20\" Alloy Wheel - Painted",
			"price_id" : "1",
			"amount" : "0.00",
			"wheel_id" : "",
			"wheel" : ""
		}
	});


	return Car;
});