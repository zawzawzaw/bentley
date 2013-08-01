define(['backbone', 'models/check'],function(Backbone, CheckModel){
	var CheckCollection = Backbone.Collection.extend({
		model : CheckModel
	});

	var checkCollection = new CheckCollection();

	return checkCollection;
});