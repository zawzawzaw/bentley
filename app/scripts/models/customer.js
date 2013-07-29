define(['backbone', 'jquery'], function(Backbone, $){
	var CustomerModel = Backbone.Model.extend({
		defaults : {
			name: 'someone\'s name',
			email : 'someone\'s email',
			address : 'someone\'s address',
			phone : 'someone\'s phone'
		}
	});

	return CustomerModel;
});