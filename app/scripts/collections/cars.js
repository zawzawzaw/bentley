define(['backbone','models/car'],function(Backbone, Car){
	var CarsCollection = Backbone.Collection.extend({
		model: Car,
		url: function(){
			return "../../../b/api/salesrecord/";
		},
		parse: function(resp, xhr)
		{
			return resp.salesrecord;
		},
		sync: function(method, model, options) {
	        var that = this;
	        var params = _.extend({
	            type: 'GET',
	            dataType: 'json',
	            url: that.url,
	            processData: false
	        }, options);

	        return $.ajax(params);
	    }
	});

	var carsCollection = new CarsCollection();

	return CarsCollection;
});