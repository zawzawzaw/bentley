define(['backbone', 'models/searchuser'],function(Backbone, SearchUserModel){
	var SearchUsersCollection = Backbone.Collection.extend({
		model : SearchUserModel,
		url: function(){
			return "../../../b/api/searchuser/";
		},
		parse: function(resp, xhr)
		{
			return resp.usersrecord;
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

	return SearchUsersCollection;
});