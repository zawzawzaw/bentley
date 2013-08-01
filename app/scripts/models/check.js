define(['backbone'], function(Backbone){
	var CheckModel = Backbone.Model.extend({	
		idAttribute: 'cat_id'
	});

	return CheckModel;
});